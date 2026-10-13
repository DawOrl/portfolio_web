"""Compact interlocking metal sculpture for the burgundy contact section.

  blender --background --factory-startup --python scripts/blender/contact_link.py

Creates a dedicated scene and exports 1100 × 850 transparent PNG. It reuses the
About/hero material family while replacing the open contact arc with two solid,
asymmetric rounded rectangular links.
"""

import importlib.util
import math
from pathlib import Path
import sys

import bmesh
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "design" / "blender"
sys.dont_write_bytecode = True
spec = importlib.util.spec_from_file_location("lower_materials", Path(__file__).with_name("lower_sections.py"))
lower = importlib.util.module_from_spec(spec)
spec.loader.exec_module(lower)


def brushed_chrome():
    mat = lower.material("Contact link · brushed ice chrome", "9fc5d3", 0.24)
    nodes = mat.node_tree.nodes
    shader = next(node for node in nodes if node.type == "BSDF_PRINCIPLED")
    anisotropy = shader.inputs.get("Anisotropic IOR Level")
    if anisotropy:
        anisotropy.default_value = 0.35
    noise = next(node for node in nodes if node.type == "TEX_NOISE")
    noise.inputs["Scale"].default_value = 100
    coordinates = nodes.new("ShaderNodeTexCoord")
    stretch = nodes.new("ShaderNodeVectorMath")
    stretch.operation = "MULTIPLY"
    stretch.inputs[1].default_value = (1, 1, 38)
    mat.node_tree.links.new(coordinates.outputs["Generated"], stretch.inputs[0])
    mat.node_tree.links.new(stretch.outputs["Vector"], noise.inputs["Vector"])
    bump = next(node for node in nodes if node.type == "BUMP")
    bump.inputs["Strength"].default_value = 0.09
    bump.inputs["Distance"].default_value = 0.007
    return mat


def rectangular_link(scene, name, center, rotation, sizes, thickness, asymmetry, materials, chrome):
    """Closed volumetric frame, with a broad face and manufactured bevels."""
    outer_x, outer_z, inner_x, inner_z = sizes
    steps = 128
    vertices, faces, material_ids = [], [], []

    def contour(t, rx, rz):
        x = rx * math.copysign(abs(math.cos(t)) ** 0.48, math.cos(t))
        z = rz * math.copysign(abs(math.sin(t)) ** 0.52, math.sin(t))
        # Unequal corner radii and a slight lean keep the two links individual.
        x += asymmetry * z + 0.055 * math.cos(2 * t)
        z += asymmetry * 0.25 * math.sin(3 * t)
        return x, z

    for rx, rz, depth in [(outer_x, outer_z, -thickness / 2),
                          (inner_x, inner_z, -thickness / 2),
                          (outer_x, outer_z, thickness / 2),
                          (inner_x, inner_z, thickness / 2)]:
        for index in range(steps):
            x, z = contour(2 * math.pi * index / steps, rx, rz)
            vertices.append((x, depth, z))

    for i in range(steps):
        nxt = (i + 1) % steps
        # Face, reverse, exterior side and inner wall, respectively.
        faces.extend([(i, nxt, steps + nxt, steps + i),
                      (2 * steps + i, 3 * steps + i, 3 * steps + nxt, 2 * steps + nxt),
                      (i, 2 * steps + i, 2 * steps + nxt, nxt),
                      (steps + i, steps + nxt, 3 * steps + nxt, 3 * steps + i)])
        material_ids.extend([0 if chrome else 1, 1, 1, 1 if chrome else 2])
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.location = center
    obj.rotation_euler = tuple(math.radians(angle) for angle in rotation)
    for mat in materials:
        mesh.materials.append(mat)
    for polygon, material_id in zip(mesh.polygons, material_ids):
        polygon.material_index = material_id
        polygon.use_smooth = True
    bevel = obj.modifiers.new("Machined ice bevel", "BEVEL")
    bevel.width = 0.14 if chrome else 0.12
    bevel.segments = 6
    bevel.limit_method = "ANGLE"
    bevel.angle_limit = 0.35
    bevel.harden_normals = True
    bevel.material = 3
    normals = obj.modifiers.new("Manufactured surface normals", "WEIGHTED_NORMAL")
    normals.keep_sharp = True
    return obj


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    scene = bpy.data.scenes.new("Contact · interlocking metal links")
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 64
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.025
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 4
    scene.render.resolution_x, scene.render.resolution_y = 1100, 850
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.filepath = str(OUTPUT / "contact-link.png")
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0.3
    preferences = bpy.context.preferences.addons["cycles"].preferences
    try:
        preferences.compute_device_type = "METAL"
        preferences.get_devices()
        devices = [device for device in preferences.devices if device.type == "METAL"]
        for device in preferences.devices:
            device.use = device.type == "METAL"
        scene.cycles.device = "GPU" if devices else "CPU"
    except TypeError:
        scene.cycles.device = "CPU"
    scene.world = bpy.data.worlds.new("Contact links · neutral studio")
    scene.world.use_nodes = True
    background = next(node for node in scene.world.node_tree.nodes if node.type == "BACKGROUND")
    background.inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    background.inputs["Strength"].default_value = 0.25
    materials = [
        brushed_chrome(),
        lower.material("Contact link · satin graphite", "292f35", 0.3),
        lower.material("Contact link · subtle wine interior", "6d0c26", 0.25, 0.85),
        lower.material("Contact link · polished cold chamfer", "9fc5d3", 0.18),
    ]
    bpy.context.window.scene = scene
    links = [
        rectangular_link(scene, "Ice chrome coupling", (-0.9, 0, 0.62),
                         (0, -8, -30), (2.25, 1.68, 1.34, 0.8), 0.68, 0.09, materials, True),
        rectangular_link(scene, "Graphite coupling", (0.9, 0, -0.62),
                         (0, 7, 28), (2.2, 1.66, 1.34, 0.76), 0.82, -0.08, materials, False),
    ]
    bpy.context.view_layer.update()
    points = [obj.matrix_world @ vertex.co for obj in links for vertex in obj.data.vertices]
    min_x, max_x = min(p.x for p in points), max(p.x for p in points)
    min_z, max_z = min(p.z for p in points), max(p.z for p in points)
    center = Vector(((min_x + max_x) / 2, 0, (min_z + max_z) / 2))
    aspect = 1100 / 850
    camera_data = bpy.data.cameras.new("Contact links · compact composition")
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = max(max_x - min_x, (max_z - min_z) * aspect) / 0.93
    camera = bpy.data.objects.new(camera_data.name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = center + Vector((0, -24, 0))
    camera.rotation_euler = (center - camera.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera
    lower.light(scene, "Hard silk key", (-3.5, -5, 5), center, (0.8, 0.9, 1), 1400, 3.5, 3)
    lower.light(scene, "Brushed chrome face reflection", (-7, -4, 1), center, (0.72, 0.86, 1), 900, 3, 6)
    lower.light(scene, "Narrow cold edge", (5, -4, 1), center, (0.66, 0.82, 1), 1000, 1, 5)
    lower.light(scene, "Top neutral reflection", (0.5, -2, 6.5), center, (0.94, 0.94, 0.92), 1400, 7, 2)
    lower.light(scene, "Quiet wine reflection", (-4, -1, -4), center, (1, 0.05, 0.12), 50, 2.5, 3)
    bpy.context.window.scene = scene
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT / "contact-link.blend"))
    bpy.ops.render.render(write_still=True, scene=scene.name)
    print(f"Contact link ready: {scene.render.filepath}", flush=True)


if __name__ == "__main__":
    main()
