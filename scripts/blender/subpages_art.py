"""Signature sculptures for the subpages: projects library, privacy and 404.

Run from the repository root:
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/subpages_art.py -- [--only NAME] [--preview]

Compositions (all transparent, graphite / burgundy enamel / icy chrome):
  library  - a swatch-fan of screen frames pinned at one corner (/realizacje hero)
  vacancy  - one empty frame taken out of the fan (/realizacje closing band)
  privacy  - a two-part padlock with a burgundy core seen through the keyhole
  broken   - the contact-section chain link snapped open (404), rendered as two
             aligned layers (links + the loose fragment) so CSS can float it

PNG renders go to --output-dir (default design/blender/subpages). Unless --no-webp
is passed, every render is encoded with cwebp into public/art/ at the sizes the
pages expect. No external models, textures, add-ons or downloads are needed.
"""

import argparse
import importlib.util
import math
from pathlib import Path
import random
import shutil
import subprocess
import sys

import bmesh
import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[2]
sys.dont_write_bytecode = True
_spec = importlib.util.spec_from_file_location("contact_link", Path(__file__).with_name("contact_link.py"))
link = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(link)
lower = link.lower  # material() and light() helpers shared with the home page

# name: (render size, [(webp file, width, quality), ...])
OUTPUTS = {
    "library": ((1400, 1200), [("library-fan.webp", 1400, 76), ("library-fan-mobile.webp", 760, 78)]),
    "vacancy": ((1100, 900), [("library-vacancy.webp", 1000, 82)]),
    "privacy": ((1100, 1100), [("privacy-lock.webp", 1000, 82), ("privacy-lock-mobile.webp", 640, 80)]),
    "broken": ((1600, 1100), [("broken-link.webp", 1500, 82), ("broken-link-mobile.webp", 800, 80)]),
    "fragment": ((1600, 1100), [("broken-link-fragment.webp", 1500, 82), ("broken-link-fragment-mobile.webp", 800, 80)]),
}


def arguments():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--only", choices=("library", "vacancy", "privacy", "broken"), action="append",
                        help="Render one composition (repeatable). 'broken' renders both 404 layers.")
    parser.add_argument("--preview", action="store_true", help="Half resolution, 24 samples, no WebP export")
    parser.add_argument("--samples", type=int, default=128)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "design" / "blender" / "subpages")
    parser.add_argument("--webp-dir", type=Path, default=ROOT / "public" / "art")
    parser.add_argument("--no-webp", action="store_true")
    parser.add_argument("--save-blend", action="store_true", help="Also save subpages-art.blend next to the PNGs")
    extra = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    return parser.parse_args(extra)


# --------------------------------------------------------------------------- scene


def use_metal():
    preferences = bpy.context.preferences.addons["cycles"].preferences
    try:
        preferences.compute_device_type = "METAL"
        preferences.get_devices()
        devices = [device for device in preferences.devices if device.type == "METAL"]
        for device in preferences.devices:
            device.use = device.type == "METAL"
        return "GPU" if devices else "CPU"
    except TypeError:
        return "CPU"


def new_scene(name, size, args, exposure=0.35):
    scene = bpy.data.scenes.new(name)
    scene.render.engine = "CYCLES"
    scene.cycles.device = args.device
    scene.cycles.samples = 24 if args.preview else args.samples
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.04 if args.preview else 0.02
    scene.cycles.max_bounces = 8
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 6
    scene.cycles.transparent_max_bounces = 4
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.render.resolution_percentage = 50 if args.preview else 100
    scene.render.film_transparent = True
    settings = scene.render.image_settings
    settings.file_format = "PNG"
    settings.color_mode = "RGBA"
    settings.color_depth = "8"
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = exposure
    scene.world = bpy.data.worlds.new(f"{name} · studio")
    scene.world.use_nodes = True
    background = next(node for node in scene.world.node_tree.nodes if node.type == "BACKGROUND")
    background.inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    background.inputs["Strength"].default_value = 0.28
    bpy.context.window.scene = scene
    return scene


def fit_camera(scene, objects, direction, margin=0.9, lens=None):
    """Camera looking along `direction`, framed tightly around the objects.

    With `lens` (mm) it is a perspective camera: view rays diverge, so flat
    polished faces show a gradient instead of one flat reflected value.
    Returns the camera and the objects' centroid (the lights aim at it).
    """
    bpy.context.view_layer.update()
    direction = Vector(direction).normalized()
    data = bpy.data.cameras.new(f"{scene.name} · camera")
    data.clip_end = 300
    camera = bpy.data.objects.new(data.name, data)
    scene.collection.objects.link(camera)
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    bpy.context.view_layer.update()
    basis = camera.matrix_world.to_3x3()
    right, up = basis @ Vector((1, 0, 0)), basis @ Vector((0, 1, 0))
    depsgraph = bpy.context.evaluated_depsgraph_get()
    points = []
    for obj in objects:
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh()
        points.extend(evaluated.matrix_world @ vertex.co for vertex in mesh.vertices)
        evaluated.to_mesh_clear()
    centroid = sum(points, Vector()) / len(points)
    aspect = scene.render.resolution_x / scene.render.resolution_y
    # Blender fits the sensor to the longer image side.
    half_w, half_h = (0.5, 0.5 / aspect) if aspect >= 1 else (0.5 * aspect, 0.5)

    def extents(values):
        return (max(values) + min(values)) / 2, (max(values) - min(values)) / 2

    if lens is None:
        data.type = "ORTHO"
        (cx, ex), (cy, ey) = extents([p.dot(right) for p in points]), extents([p.dot(up) for p in points])
        data.ortho_scale = max(ex / half_w, ey / half_h) / 2 / margin
        center = right * cx + up * cy + direction * centroid.dot(direction)
        camera.location = center - direction * 60
        scene.camera = camera
        return camera, centroid
    data.type = "PERSP"
    data.lens = lens
    distance = 20.0
    for _ in range(8):
        eye = centroid - direction * distance
        us = [(p - eye).dot(right) / (p - eye).dot(direction) * lens / 36 for p in points]
        vs = [(p - eye).dot(up) / (p - eye).dot(direction) * lens / 36 for p in points]
        (cu, eu), (cv, ev) = extents(us), extents(vs)
        distance *= max(eu / half_w, ev / half_h) / margin
    eye = centroid - direction * distance
    us = [(p - eye).dot(right) / (p - eye).dot(direction) * lens / 36 for p in points]
    vs = [(p - eye).dot(up) / (p - eye).dot(direction) * lens / 36 for p in points]
    data.shift_x, data.shift_y = extents(us)[0], extents(vs)[0]
    camera.location = eye
    scene.camera = camera
    return camera, centroid


def light(scene, name, position, target, color, energy, size, size_y, receivers=None):
    """Rectangular area light aimed at `target`.

    With `receivers`, Cycles light linking restricts the light to those
    objects, so a softbox can shape one sheet without flattening the others.
    """
    lower.light(scene, name, position, target, color, energy, size, size_y)
    obj = scene.objects[name] if name in scene.objects else bpy.data.objects[name]
    if receivers:
        collection = bpy.data.collections.new(f"{name} · receivers")
        for receiver in receivers:
            collection.objects.link(receiver)
        obj.light_linking.receiver_collection = collection
    return obj


def mirror_light(scene, name, obj, local_normal, view, distance, color, energy, size, size_y, offset=(0, 0, 0),
                 receivers=None):
    """Softbox placed where the camera's view ray reflects off a face of `obj`.

    Guarantees a broad, controlled highlight on a polished face whatever the
    object's rotation; `offset` slides the box to move the highlight.
    """
    bpy.context.view_layer.update()
    normal = (obj.matrix_world.to_3x3() @ Vector(local_normal)).normalized()
    view = Vector(view).normalized()
    reflected = view - 2 * view.dot(normal) * normal
    target = obj.matrix_world.translation
    return light(scene, name, target + reflected * distance + Vector(offset), target, color, energy, size, size_y,
                 receivers)


def chip(scene, name, location, scale, rotation, material, seed):
    """Small irregular shard of metal that flew off at the break."""
    rng = random.Random(seed)
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=1, radius=1)
    for vertex in bm.verts:
        vertex.co *= rng.uniform(0.7, 1.15)
    bm.to_mesh(mesh)
    bm.free()
    mesh.materials.append(material)
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.location, obj.scale = location, scale
    obj.rotation_euler = tuple(math.radians(a) for a in rotation)
    return obj


# ------------------------------------------------------------------- geometry


def rounded_rect(width, height, radius, segments=14, center=(0, 0)):
    """Counter-clockwise rounded rectangle outline in the XY plane."""
    cx, cy = center
    hw, hh = width / 2 - radius, height / 2 - radius
    points = []
    for corner, (sx, sy) in enumerate(((1, 1), (-1, 1), (-1, -1), (1, -1))):
        start = corner * math.pi / 2
        for step in range(segments + 1):
            angle = start + step / segments * math.pi / 2
            points.append((cx + sx * hw + radius * math.cos(angle), cy + sy * hh + radius * math.sin(angle)))
    return points


def keyhole(cx, cy, radius, slot_top, slot_bottom, depth, segments=48):
    """Clockwise keyhole outline: a round head above a tapered slot."""
    join = math.asin(min(0.99, slot_top / radius))
    points = []
    # Start at the right side of the slot top and sweep over the head.
    start, end = -math.pi / 2 + join, 3 * math.pi / 2 - join
    for step in range(segments + 1):
        angle = start + (end - start) * step / segments
        points.append((cx + radius * math.cos(angle), cy + radius * math.sin(angle)))
    bottom = cy - depth
    points += [(cx - slot_bottom, bottom + 0.04), (cx - slot_bottom + 0.04, bottom),
               (cx + slot_bottom - 0.04, bottom), (cx + slot_bottom, bottom + 0.04)]
    return list(reversed(points))


def point_in_polygon(x, y, polygon):
    inside = False
    for (x1, y1), (x2, y2) in zip(polygon, polygon[1:] + polygon[:1]):
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def slab(scene, name, outline, holes, extrude, bevel, materials, slots):
    """Machined plate from a 2D outline (with holes), converted to a mesh.

    `slots` maps finish -> material index: face (front/back), side (outer wall),
    inner (walls of the holes) and chamfer (the rounded transition).
    """
    curve = bpy.data.curves.new(f"{name} · outline", "CURVE")
    curve.dimensions = "2D"
    curve.fill_mode = "BOTH"
    curve.extrude = extrude
    curve.bevel_mode = "ROUND"
    curve.bevel_depth = bevel
    curve.bevel_resolution = 6
    for polygon in [outline, *holes]:
        spline = curve.splines.new("POLY")
        spline.points.add(len(polygon) - 1)
        for point, (x, y) in zip(spline.points, polygon):
            point.co = (x, y, 0, 1)
        spline.use_cyclic_u = True
    temporary = bpy.data.objects.new(curve.name, curve)
    scene.collection.objects.link(temporary)
    bpy.context.view_layer.update()
    depsgraph = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(temporary.evaluated_get(depsgraph))
    bpy.data.objects.remove(temporary)
    bpy.data.curves.remove(curve)
    mesh.name = name
    for material in materials:
        mesh.materials.append(material)
    for polygon in mesh.polygons:
        nz = abs(polygon.normal.z)
        c = polygon.center
        if nz > 0.985:
            polygon.material_index = slots["face"]
        elif nz > 0.22:
            polygon.material_index = slots["chamfer"]
        elif any(point_in_polygon(c.x, c.y, hole) for hole in holes):
            polygon.material_index = slots.get("inner", slots["side"])
        else:
            polygon.material_index = slots["side"]
        polygon.use_smooth = True
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    # Stand the plate up: local +Z (extrusion) faces the camera at -Y.
    obj.rotation_euler = (math.radians(90), 0, 0)
    return obj


def pin(scene, name, radius, length, material):
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=64, radius1=radius, radius2=radius, depth=length)
    bm.to_mesh(mesh)
    bm.free()
    for polygon in mesh.polygons:
        polygon.use_smooth = True
    mesh.materials.append(material)
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    bevel = obj.modifiers.new("Domed rivet", "BEVEL")
    bevel.width = radius * 0.45
    bevel.segments = 8
    bevel.limit_method = "ANGLE"
    obj.rotation_euler = (math.radians(90), 0, 0)
    return obj


def tube(scene, name, points, radius, material):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_mode = "ROUND"
    curve.bevel_depth = radius
    curve.bevel_resolution = 10
    curve.use_fill_caps = True
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for point, co in zip(spline.points, points):
        point.co = (*co, 1)
    curve.materials.append(material)
    obj = bpy.data.objects.new(name, curve)
    scene.collection.objects.link(obj)
    return obj


def group(scene, name, objects, location=(0, 0, 0), rotation=(0, 0, 0)):
    empty = bpy.data.objects.new(name, None)
    scene.collection.objects.link(empty)
    for obj in objects:
        obj.parent = empty
    empty.location = location
    empty.rotation_euler = tuple(math.radians(a) for a in rotation)
    return empty


def shard_field(seed, size_x, size_y, cells, amplitude, slope):
    """Height field made of flat facets (one random plane per Voronoi cell).

    Neighbouring cells meet in small cliffs, which reads as cast metal that has
    snapped, rather than as smooth noise.
    """
    rng = random.Random(seed)
    seeds = [(rng.uniform(-size_x / 2, size_x / 2), rng.uniform(-size_y / 2, size_y / 2),
              rng.uniform(-amplitude, amplitude), rng.uniform(-slope, slope), rng.uniform(-slope, slope))
             for _ in range(cells)]

    def height(x, y):
        sx, sy, offset, a, b = min(seeds, key=lambda s: (s[0] - x) ** 2 + (s[1] - y) ** 2)
        return offset + a * (x - sx) + b * (y - sy)

    return height


def fracture_cutter(scene, name, size_x, size_y, gap, tilt, amplitude, seed, material, resolution=110):
    """Closed slab whose top and bottom are faceted fracture surfaces.

    Used as a Boolean operand: the difference opens the link, the intersection
    is the broken-off piece, and both cut faces receive the enamel material.
    """
    upper = shard_field(seed, size_x, size_y, 7, amplitude, 0.32)
    lower_field = shard_field(seed + 5, size_x, size_y, 7, amplitude, 0.32)

    def surface(x, y, field, sign):
        return sign * gap / 2 + tilt * x + field(x, y)

    n = resolution
    vertices, faces = [], []
    for field, sign in ((upper, 1), (lower_field, -1)):
        for j in range(n + 1):
            for i in range(n + 1):
                x = -size_x / 2 + size_x * i / n
                y = -size_y / 2 + size_y * j / n
                edge = i in (0, n) or j in (0, n)
                z = sign * gap / 2 + tilt * x if edge else surface(x, y, field, sign)
                vertices.append((x, y, z))
    top, bottom = 0, (n + 1) ** 2

    def index(base, i, j):
        return base + j * (n + 1) + i

    for j in range(n):
        for i in range(n):
            faces.append((index(top, i, j), index(top, i + 1, j), index(top, i + 1, j + 1), index(top, i, j + 1)))
            faces.append((index(bottom, i, j), index(bottom, i, j + 1), index(bottom, i + 1, j + 1), index(bottom, i + 1, j)))
    ring = [(i, 0) for i in range(n)] + [(n, j) for j in range(n)] + [(i, n) for i in range(n, 0, -1)] + [(0, j) for j in range(n, 0, -1)]
    for (i1, j1), (i2, j2) in zip(ring, ring[1:] + ring[:1]):
        faces.append((index(top, i2, j2), index(top, i1, j1), index(bottom, i1, j1), index(bottom, i2, j2)))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    mesh.materials.append(material)
    for polygon in mesh.polygons:
        polygon.use_smooth = False
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.hide_render = True
    obj.display_type = "WIRE"
    return obj


def boolean(obj, cutter, operation):
    mod = obj.modifiers.new(f"Fracture · {operation.lower()}", "BOOLEAN")
    mod.operation = operation
    mod.object = cutter
    mod.solver = "EXACT"
    mod.material_mode = "TRANSFER"
    # Keep the manufactured normals pass last, after the fracture.
    for old in [m for m in obj.modifiers if m.type == "WEIGHTED_NORMAL"]:
        obj.modifiers.remove(old)
    normals = obj.modifiers.new("Manufactured surface normals", "WEIGHTED_NORMAL")
    normals.keep_sharp = True
    return mod


# --------------------------------------------------------------- compositions


def coat(material, weight):
    shader = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Coat Weight"].default_value = weight
    return material


def enamel():
    """Burgundy metal flake under a thin lacquer: reflections stay wine-red."""
    material = lower.material("Subpages · burgundy enamel", "a00c30", 0.3, 1)
    shader = next(node for node in material.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Coat Weight"].default_value = 0.12
    shader.inputs["Coat Roughness"].default_value = 0.12
    return material


def radial_brushed(name, color, roughness):
    """Concentric machining around the plate's own Z axis, like a vault dial."""
    material = coat(lower.material(name, color, roughness), 0.1)
    nodes, links = material.node_tree.nodes, material.node_tree.links
    shader = next(node for node in nodes if node.type == "BSDF_PRINCIPLED")
    tangent = nodes.new("ShaderNodeTangent")
    tangent.direction_type = "RADIAL"
    tangent.axis = "Z"
    shader.inputs["Anisotropic"].default_value = 0.75
    links.new(tangent.outputs["Tangent"], shader.inputs["Tangent"])
    return material


def palette():
    return {
        "graphite": coat(lower.material("Subpages · satin graphite", "39414a", 0.3), 0.12),
        "graphite_dark": coat(lower.material("Subpages · deep graphite", "252a30", 0.34), 0.1),
        "enamel": enamel(),
        "wine": lower.material("Subpages · wine interior", "6d0c26", 0.26, 0.85),
        "ice": lower.material("Subpages · polished ice contour", "9fc5d3", 0.17),
        "chrome": link.brushed_chrome(),
        "dial": radial_brushed("Subpages · radial brushed graphite", "3a424a", 0.3),
        "fracture": coat(lower.material("Subpages · raw enamel fracture", "7a0a26", 0.36, 1), 0),
    }


def frame_plate(scene, name, face, m, with_pin_hole=False):
    outline = rounded_rect(3.4, 2.16, 0.26)
    window = rounded_rect(2.78, 1.54, 0.1, segments=10)
    holes = [window]
    if with_pin_hole:
        holes.append([(-1.5 + 0.075 * math.cos(a), -0.88 + 0.075 * math.sin(a))
                      for a in (-2 * math.pi * k / 40 for k in range(40))])
    materials = [face, m["ice"], m["graphite_dark"], m["wine"]]
    return slab(scene, name, outline, holes, 0.06, 0.06, materials,
                {"face": 0, "chamfer": 1, "side": 2, "inner": 3})


def build_library(args, m):
    scene = new_scene("Subpages · Library fan", OUTPUTS["library"][0], args, exposure=0.3)
    # Front to back: enamel, a graphite progression, an ice-chrome top sheet.
    faces = [m["enamel"], m["graphite_dark"], m["graphite"], m["graphite_dark"], m["graphite"], m["chrome"]]
    pivot, spacing, step, lean = Vector((-1.5, 0, -0.88)), 0.34, 13.5, 4.5
    frames = []
    for index, face in enumerate(faces):
        plate = frame_plate(scene, f"Library frame {index + 1}", face, m)
        # Fan around the rivet (world Y) and let each sheet lean back a little
        # more than the one before, so no two faces mirror the same light.
        around_pin = Matrix.Rotation(-math.radians(step * index), 4, "Y")
        leaning = Matrix.Rotation(math.radians(lean * index), 4, "X")
        rotation = Matrix.Translation(pivot) @ around_pin @ leaning @ Matrix.Translation(-pivot)
        plate.matrix_basis = Matrix.Translation((0, spacing * index, 0)) @ rotation @ plate.matrix_basis
        frames.append(plate)
    rivet = pin(scene, "Library rivet", 0.1, spacing * (len(faces) - 1) + 0.42, m["ice"])
    rivet.location = (pivot.x, spacing * (len(faces) - 1) / 2, pivot.z)
    fan = group(scene, "Library fan", frames + [rivet], rotation=(-20, 4, 34))
    bpy.context.view_layer.update()
    view = (0.12, 1, -0.2)
    camera, center = fit_camera(scene, frames + [rivet], view, margin=0.92, lens=80)
    # Strip lights draw the machined edges. Face reflections are aimed per sheet:
    # a deep red enamel front, one lit graphite sheet mid-fan, a bright chrome top.
    light(scene, "Top rim from behind", center + Vector((1, 9, 5)), center, (0.93, 0.93, 0.91), 900, 8, 0.6)
    light(scene, "Ice vertical strip", center + Vector((-6.5, -4, 2.5)), center, (0.62, 0.8, 1), 900, 0.8, 8)
    light(scene, "Cold right rim", center + Vector((6.5, -1, 2)), center, (0.6, 0.82, 1), 600, 0.8, 7,
          receivers=frames[1:] + [rivet])
    mirror_light(scene, "Enamel face softbox", frames[0], (0, 0, 1), view, 9, (1, 0.95, 0.94), 170, 2.6, 1.4,
                 offset=(1.8, 0, 0.6), receivers=[frames[0]])
    mirror_light(scene, "Mid sheet softbox", frames[3], (0, 0, 1), view, 9, (0.85, 0.92, 1), 380, 2.2, 1.6,
                 receivers=frames[1:5])
    mirror_light(scene, "Chrome sheet softbox", frames[-1], (0, 0, 1), view, 9, (0.85, 0.93, 1), 650, 3, 2,
                 receivers=[frames[-1]])
    light(scene, "Wine lower bounce", center + Vector((-3.5, -1, -5)), center, (1, 0.05, 0.12), 260, 3, 4)
    return scene, fan


def build_vacancy(args, m):
    scene = new_scene("Subpages · Vacant frame", OUTPUTS["vacancy"][0], args, exposure=0.3)
    plate = frame_plate(scene, "Vacant frame", m["chrome"], m, with_pin_hole=True)
    holder = group(scene, "Vacant frame tilt", [plate], rotation=(-26, 10, 38))
    bpy.context.view_layer.update()
    camera, center = fit_camera(scene, [plate], (0.1, 1, -0.18), margin=0.86, lens=80)
    light(scene, "Top silk", center + Vector((1, -2, 7)), center, (0.95, 0.94, 0.92), 1300, 8, 2)
    light(scene, "Ice edge", center + Vector((-6, -4, 1.5)), center, (0.7, 0.86, 1), 900, 1.2, 6)
    light(scene, "Cold right rim", center + Vector((6, -2, 1)), center, (0.66, 0.82, 1), 1100, 1, 5)
    # The page behind is burgundy: let the metal carry a warm enamel reflection.
    light(scene, "Burgundy floor", center + Vector((0, -3, -6)), center, (1, 0.04, 0.12), 1400, 12, 5)
    light(scene, "Burgundy left wall", center + Vector((-7, -1, -1)), center, (1, 0.05, 0.13), 700, 4, 9)
    return scene, holder


def build_privacy(args, m):
    scene = new_scene("Subpages · Privacy lock", OUTPUTS["privacy"][0], args, exposure=0.3)
    body = rounded_rect(2.6, 2.15, 0.52, segments=18)
    hole = keyhole(0, 0.16, 0.26, 0.1, 0.17, 0.78)
    front = slab(scene, "Lock front plate", body, [hole], 0.1, 0.08,
                 [m["dial"], m["ice"], m["graphite_dark"], m["wine"]],
                 {"face": 0, "chamfer": 1, "side": 2, "inner": 3})
    core = slab(scene, "Lock enamel core", rounded_rect(2.5, 2.05, 0.47, segments=18), [], 0.12, 0.03,
                [m["enamel"], m["enamel"], m["wine"]], {"face": 0, "chamfer": 1, "side": 2})
    back = slab(scene, "Lock back plate", body, [], 0.18, 0.08,
                [m["graphite_dark"], m["ice"], m["graphite_dark"]], {"face": 0, "chamfer": 1, "side": 2})
    front.location.y, core.location.y, back.location.y = -0.33, -0.03, 0.33
    legs, arc = 0.66, []
    for step in range(49):
        angle = math.pi * step / 48
        arc.append((legs * math.cos(angle), 0.03, 1.55 + legs * math.sin(angle)))
    shackle_points = [(legs, 0.03, 0.55), (legs, 0.03, 1.55), *arc[1:-1], (-legs, 0.03, 1.55), (-legs, 0.03, 0.75)]
    shackle = tube(scene, "Lock ice shackle", shackle_points, 0.19, m["chrome"])
    lock = group(scene, "Privacy lock", [front, core, back, shackle], rotation=(-9, 0, -34))
    bpy.context.view_layer.update()
    camera, center = fit_camera(scene, [front, core, back, shackle], (-0.1, 1, -0.12), margin=0.8, lens=85)
    light(scene, "Top silk", center + Vector((0.5, -3, 7.5)), center, (0.93, 0.93, 0.91), 1500, 9, 2.5)
    light(scene, "Ice vertical", center + Vector((-5, -6, 2)), center, (0.62, 0.8, 1), 1100, 2, 7)
    light(scene, "Cold right rim", center + Vector((5.5, -2, 1.5)), center, (0.6, 0.82, 1), 1100, 1.1, 6)
    light(scene, "Keyhole warm fill", center + Vector((-1, -6, -1)), center, (1, 0.25, 0.3), 140, 2, 2)
    light(scene, "Wine lower bounce", center + Vector((-3, -1, -5)), center, (1, 0.05, 0.12), 140, 3, 4)
    return scene, lock


def build_broken(args, m):
    scene = new_scene("Subpages · Broken link", OUTPUTS["broken"][0], args, exposure=0.3)
    materials = [m["chrome"], m["graphite"], m["wine"], m["ice"], m["fracture"]]
    sizes, thickness, lean = (2.2, 1.66, 1.34, 0.76), 0.78, -0.08
    intact = link.rectangular_link(scene, "Intact graphite link", (0, 0, 0), (0, 0, 0),
                                   (2.25, 1.68, 1.34, 0.8), 0.82, 0.09, materials, False)
    broken = link.rectangular_link(scene, "Snapped ice link", (0, 0, 0), (0, 0, 0),
                                   sizes, thickness, lean, materials, True)
    piece = link.rectangular_link(scene, "Snapped-off piece", (0, 0, 0), (0, 0, 0),
                                  sizes, thickness, lean, materials, True)
    for obj in (broken, piece):
        cutter = fracture_cutter(scene, f"{obj.name} · fracture", 1.6, 1.7, 1.3, 0.14, 0.13, 7, m["fracture"])
        cutter.parent = obj
        cutter.location = (-1.76, 0, 0.0)
        boolean(obj, cutter, "DIFFERENCE" if obj is broken else "INTERSECT")
    degrees = lambda *angles: tuple(math.radians(a) for a in angles)
    intact.location, intact.rotation_euler = (-3.6, 0.6, 0.55), degrees(10, -18, -28)
    broken.location, broken.rotation_euler = (2.7, 0, -0.45), degrees(24, 22, 16)
    piece.location, piece.rotation_euler = (-0.05, -1.2, 0.05), degrees(58, -34, 62)
    bpy.context.view_layer.update()
    chips = [
        chip(scene, "Chip 1", (0.7, -1.4, 0.85), (0.19, 0.13, 0.1), (20, 40, 10), m["fracture"], 3),
        chip(scene, "Chip 2", (1.05, -1.1, -1.15), (0.13, 0.1, 0.08), (60, 10, 30), m["chrome"], 5),
        chip(scene, "Chip 3", (-0.95, -1.3, 1.05), (0.1, 0.08, 0.065), (10, 70, 45), m["fracture"], 9),
    ]
    view = (0.08, 1, -0.3)
    camera, center = fit_camera(scene, [intact, broken, piece], view, margin=0.9, lens=70)
    light(scene, "Hard silk key", center + Vector((-3.5, -5, 5)), center, (0.8, 0.9, 1), 1100, 3.5, 3)
    light(scene, "Narrow cold edge", center + Vector((7, -2, 1)), center, (0.66, 0.82, 1), 1300, 0.8, 6)
    light(scene, "Top rim", center + Vector((0.5, 3, 7)), center, (0.94, 0.94, 0.92), 1300, 9, 1.5)
    mirror_light(scene, "Chrome face softbox", broken, (0, -1, 0), view, 10, (0.82, 0.92, 1), 1500, 6, 3.5, offset=(-1.5, 0, 1))
    mirror_light(scene, "Graphite face strip", intact, (0, -1, 0), view, 10, (0.8, 0.9, 1), 380, 1, 6, offset=(1.5, 0, 0))
    mirror_light(scene, "Piece face softbox", piece, (0, -1, 0), view, 10, (0.85, 0.93, 1), 900, 3, 3)
    light(scene, "Fracture key", center + Vector((-1.5, -6, 4)), center + Vector((0.5, 0, -0.3)), (1, 0.86, 0.84), 260, 1.2, 1.2)
    light(scene, "Wine lower bounce", center + Vector((-0.5, -3, -5)), center, (1, 0.06, 0.14), 300, 3, 3)
    return scene, {"links": [intact, broken], "piece": [piece, *chips]}


# --------------------------------------------------------------------- output


def render(scene, path):
    scene.render.filepath = str(path)
    print(f"Rendering {scene.name} -> {path}", flush=True)
    bpy.ops.render.render(write_still=True, scene=scene.name)


def encode(png, outputs, webp_dir):
    cwebp = shutil.which("cwebp") or "/opt/homebrew/bin/cwebp"
    webp_dir.mkdir(parents=True, exist_ok=True)
    for filename, width, quality in outputs:
        target = webp_dir / filename
        subprocess.run([cwebp, "-quiet", "-q", str(quality), "-alpha_q", "90", "-m", "6", "-sharp_yuv",
                        "-resize", str(width), "0", str(png), "-o", str(target)], check=True)
        print(f"WebP {target} ({target.stat().st_size // 1024} KB)", flush=True)


def main():
    args = arguments()
    args.device = use_metal()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    selected = args.only or ["library", "vacancy", "privacy", "broken"]
    m = palette()
    jobs = []
    if "library" in selected:
        jobs.append(("library", build_library(args, m)[0]))
    if "vacancy" in selected:
        jobs.append(("vacancy", build_vacancy(args, m)[0]))
    if "privacy" in selected:
        jobs.append(("privacy", build_privacy(args, m)[0]))
    broken = None
    if "broken" in selected:
        broken = build_broken(args, m)
    if args.save_blend:
        bpy.ops.wm.save_as_mainfile(filepath=str(args.output_dir / "subpages-art.blend"))
    suffix = "-preview" if args.preview else ""
    rendered = []
    for name, scene in jobs:
        path = args.output_dir / f"{name}{suffix}.png"
        render(scene, path)
        rendered.append((name, path))
    if broken:
        scene, parts = broken
        # Layer 1: both links, the loose piece hidden. Layer 2: only the piece,
        # rendered from the same camera so the two PNGs align pixel for pixel.
        for obj in parts["piece"]:
            obj.hide_render = True
        path = args.output_dir / f"broken{suffix}.png"
        render(scene, path)
        rendered.append(("broken", path))
        for obj in parts["piece"]:
            obj.hide_render = False
        for obj in parts["links"]:
            obj.hide_render = True
        path = args.output_dir / f"fragment{suffix}.png"
        render(scene, path)
        rendered.append(("fragment", path))
    if not args.preview and not args.no_webp:
        for name, path in rendered:
            encode(path, OUTPUTS[name][1], args.webp_dir)
    print("Done.", flush=True)


if __name__ == "__main__":
    main()
