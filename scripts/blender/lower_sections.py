"""Procedural, transparent sculptures for the process and contact sections.

  blender --background --factory-startup --python scripts/blender/lower_sections.py

In a live Blender, call build_scenes() to create isolated scenes without deleting
or saving over the user's scene. Run the CLI with --factory-startup to save a
dedicated project and render the images independently.
"""

import argparse
import ast
import importlib.util
import math
from pathlib import Path
import re
import sys

import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "design" / "blender"
NAMES = {"process": "Lower · Process layers", "contact": "Lower · Contact open binding"}
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("about_palette", Path(__file__).with_name("about_background.py"))
about = importlib.util.module_from_spec(spec)
spec.loader.exec_module(about)


def enum(owner, field, identifier):
    identifiers = [item.identifier for item in owner.bl_rna.properties[field].enum_items]
    if identifier not in identifiers:
        # Color-management enums are contextual and may be absent from RNA's list.
        try:
            setattr(owner, field, "__lower_sections_probe__")
        except TypeError as error:
            match = re.search(r"not found in (\(.*\))", str(error))
            if match:
                identifiers = ast.literal_eval(match.group(1))
    if identifier not in identifiers:
        raise ValueError(f"{field}: {identifier} unavailable; supported values: {identifiers}")
    return identifier


def material(name, color, roughness, metallic=1):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = next(node for node in mat.node_tree.nodes if node.type == "BSDF_PRINCIPLED")
    shader.inputs["Base Color"].default_value = (*about.linear_hex(color), 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Coat Weight"].default_value = 0.25
    shader.inputs["Coat Roughness"].default_value = 0.22
    mat.diffuse_color = (*about.linear_hex(color), 1)
    texture = mat.node_tree.nodes.new("ShaderNodeTexNoise")
    texture.inputs["Scale"].default_value = 480
    texture.inputs["Detail"].default_value = 2
    bump = mat.node_tree.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.045
    bump.inputs["Distance"].default_value = 0.015
    mat.node_tree.links.new(texture.outputs["Fac"], bump.inputs["Height"])
    mat.node_tree.links.new(bump.outputs["Normal"], shader.inputs["Normal"])
    return mat


def band(scene, name, path, width, twist, materials, steps=260):
    """An open, capped band with graphite face, burgundy reverse and machined lips."""
    profile = 24
    vertices, faces, material_ids, edge_points = [], [], [], [[], []]
    for i in range(steps + 1):
        t = i / steps
        point = Vector(path(t))
        lo, hi = max(0, t - 0.0001), min(1, t + 0.0001)
        tangent = (Vector(path(hi)) - Vector(path(lo))).normalized()
        across = Vector((tangent.z, 0, -tangent.x)).normalized()
        normal = tangent.cross(across).normalized()
        angle = twist(t)
        transverse = across * math.cos(angle) + normal * math.sin(angle)
        depth_axis = across * -math.sin(angle) + normal * math.cos(angle)
        half_width = width(t) / 2
        for j in range(profile):
            a = 2 * math.pi * j / profile
            u = math.copysign(abs(math.cos(a)) ** 0.46, math.cos(a)) * half_width
            v = math.copysign(abs(math.sin(a)) ** 0.46, math.sin(a)) * 0.065
            vertices.append(point + transverse * u + depth_axis * v)
        edge_points[0].append(point - transverse * half_width)
        edge_points[1].append(point + transverse * half_width)

    for i in range(steps):
        for j in range(profile):
            faces.append((i * profile + j, (i + 1) * profile + j,
                          (i + 1) * profile + (j + 1) % profile,
                          i * profile + (j + 1) % profile))
            a = 2 * math.pi * (j + 0.5) / profile
            material_ids.append(1 if math.sin(a) > 0.45 else 0)
    faces.extend([tuple(reversed(range(profile))),
                  tuple(steps * profile + j for j in range(profile))])
    material_ids.extend([2, 2])
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    for mat in materials:
        mesh.materials.append(mat)
    for face, index in zip(mesh.polygons, material_ids):
        face.material_index = index
        face.use_smooth = len(face.vertices) == 4

    for index, points in enumerate(edge_points):
        curve = bpy.data.curves.new(f"{name} · icy lip {index}", "CURVE")
        curve.dimensions = enum(curve, "dimensions", "3D")
        curve.bevel_depth = 0.021
        curve.bevel_resolution = 3
        spline = curve.splines.new("POLY")
        spline.points.add(len(points) - 1)
        for curve_point, point in zip(spline.points, points):
            curve_point.co = (*point, 1)
        lip = bpy.data.objects.new(curve.name, curve)
        scene.collection.objects.link(lip)
        curve.materials.append(materials[2])
    return obj


def light(scene, name, position, target, color, energy, size, size_y):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.color = color
    data.shape = enum(data, "shape", "RECTANGLE")
    data.size, data.size_y = size, size_y
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = position
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def setup_scene(variant, resolution):
    scene = bpy.data.scenes.new(NAMES[variant])
    try:
        scene.render.engine = "CYCLES"
    except TypeError as error:
        raise RuntimeError(f"Cycles is required for this sculpture: {error}") from error
    scene.cycles.samples = 48
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.025
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 4
    scene.render.resolution_x, scene.render.resolution_y = resolution
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    settings = scene.render.image_settings
    settings.file_format = enum(settings, "file_format", "PNG")
    settings.color_mode = enum(settings, "color_mode", "RGBA")
    settings.color_depth = enum(settings, "color_depth", "8")
    scene.render.filepath = str(OUTPUT / f"{variant}-form.png")
    scene.view_settings.view_transform = enum(scene.view_settings, "view_transform", "AgX")
    scene.view_settings.look = enum(scene.view_settings, "look", "AgX - Medium High Contrast")
    scene.view_settings.exposure = 0.45
    scene.world = bpy.data.worlds.new(f"{variant} · studio reflections")
    scene.world.use_nodes = True
    background = next(node for node in scene.world.node_tree.nodes if node.type == "BACKGROUND")
    background.inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    background.inputs["Strength"].default_value = 0.3
    preferences = bpy.context.preferences.addons["cycles"].preferences
    try:
        preferences.compute_device_type = enum(preferences, "compute_device_type", "METAL")
        preferences.get_devices()
        devices = [device for device in preferences.devices if device.type == "METAL"]
        for device in preferences.devices:
            device.use = device.type == "METAL"
        scene.cycles.device = enum(scene.cycles, "device", "GPU" if devices else "CPU")
    except (TypeError, ValueError):
        scene.cycles.device = enum(scene.cycles, "device", "CPU")
    return scene


def compose(scene):
    points = [vertex.co for obj in scene.objects if obj.type == "MESH" for vertex in obj.data.vertices]
    min_x, max_x = min(p.x for p in points), max(p.x for p in points)
    min_z, max_z = min(p.z for p in points), max(p.z for p in points)
    center = Vector(((min_x + max_x) / 2, 0, (min_z + max_z) / 2))
    aspect = scene.render.resolution_x / scene.render.resolution_y
    camera_data = bpy.data.cameras.new(f"{scene.name} · full composition")
    camera_data.type = enum(camera_data, "type", "ORTHO")
    # Blender's orthographic scale follows the longer image dimension.
    camera_data.ortho_scale = max(max_x - min_x, (max_z - min_z) * aspect) / 0.88 if aspect > 1 else max(max_z - min_z, (max_x - min_x) / aspect) / 0.88
    camera = bpy.data.objects.new(camera_data.name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = center + Vector((0, -24, 0))
    camera.rotation_euler = (center - camera.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera
    light(scene, "Vertical ice softbox", (-5, -6.5, 3), center, (0.62, 0.8, 1), 1600, 2, 8)
    light(scene, "Top silk softbox", (0.5, -3, 7.5), center, (0.92, 0.92, 0.9), 1900, 10, 2.5)
    light(scene, "Right cold rim", (6, -3.5, 2), center, (0.6, 0.82, 1), 1300, 1.1, 7)
    light(scene, "Subtle wine bounce", (-4, -1, -5.4), center, (1, 0.045, 0.11), 140, 3, 4)


def build_scenes():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    materials = [
        material("Lower · satin graphite exterior", "454d55", 0.29),
        material("Lower · burgundy enamel interior", "a00c30", 0.23, 0.8),
        material("Lower · polished ice contour", "9fc5d3", 0.19),
    ]
    process = setup_scene("process", (1100, 800))
    band(process, "Process · first gently lifted sheet",
         lambda t: (-4 + 6.6 * t, 0.9 + 0.3 * math.sin(math.pi * t), -1.45 + 0.45 * math.sin(math.pi * t) - 0.2 * t),
         lambda t: 0.6 + 1.2 * math.sin(math.pi * t) ** 0.45,
         lambda t: -0.2 + 0.8 * t, materials)
    band(process, "Process · second folded sheet",
         lambda t: (-3.6 + 7 * t, 0.1 + 0.65 * math.sin(2 * math.pi * t), -0.15 + 1.2 * math.sin(math.pi * t) + 0.4 * t),
         lambda t: 0.65 + 1.05 * math.sin(math.pi * t) ** 0.55,
         lambda t: 0.1 + 2.6 * t, materials)
    band(process, "Process · third fully sculpted sheet",
         lambda t: (-2.8 + 6.4 * t, -0.9 + 0.7 * math.sin(2 * math.pi * t), 1.1 + 1.35 * math.sin(math.pi * t) + 0.25 * t),
         lambda t: 0.55 + 1.1 * math.sin(math.pi * t) ** 0.65,
         lambda t: 0.3 + 4.6 * t + 0.3 * math.sin(2 * math.pi * t), materials)
    compose(process)

    contact = setup_scene("contact", (900, 1100))
    tilt = Matrix.Rotation(math.radians(-18), 4, "Y")

    def contact_path(t):
        angle = -2.6 + 4.75 * t
        point = Vector((2.3 * (math.cos(angle) + 0.3 * math.cos(2 * angle)),
                        0.9 * math.sin(2 * angle + 0.6),
                        3.45 * (math.sin(angle) - 0.18 * math.sin(2 * angle))))
        return tilt @ point

    band(contact, "Contact · open twisted binding", contact_path,
         lambda t: 0.46 + 0.9 * math.sin(math.pi * t) ** 0.65 + 0.12 * math.sin(3 * math.pi * t),
         lambda t: -2.6 + 4.75 * t + 0.6 + 0.5 * math.sin(2 * (-2.6 + 4.75 * t)), materials)
    compose(contact)
    scenes = {"process": process, "contact": contact}
    return scenes


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--render-existing", action="store_true")
    extra = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = parser.parse_args(extra)
    scenes = ({variant: bpy.data.scenes[name] for variant, name in NAMES.items()}
              if args.render_existing else build_scenes())
    if not args.render_existing:
        bpy.context.window.scene = scenes["process"]
        bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT / "lower-sections.blend"))
    for variant, scene in scenes.items():
        print(f"Rendering {variant}: {scene.render.filepath}", flush=True)
        bpy.ops.render.render(write_still=True, scene=scene.name)


if __name__ == "__main__":
    main()
