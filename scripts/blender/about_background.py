"""Procedural metal-ribbon backdrop for the About portrait.

Run from the repository root:
  blender --background --factory-startup --python scripts/blender/about_background.py -- --preview
  blender --background --factory-startup --python scripts/blender/about_background.py

The saved .blend contains independently composed Desktop and Mobile scenes.
No image textures, external models, add-ons or downloads are needed.
"""

import argparse
import math
from pathlib import Path
import sys

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]


def arguments():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preview", action="store_true", help="Render at 40% with 24 samples")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "design" / "blender")
    parser.add_argument("--samples", type=int, default=64)
    parser.add_argument("--device", choices=("CPU", "METAL"), default="METAL" if sys.platform == "darwin" else "CPU")
    parser.add_argument("--only", choices=("desktop", "mobile"), help="Render only one composition")
    extra = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    return parser.parse_args(extra)


def linear_hex(value):
    values = [int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in values)


def metal(name, color, roughness, metallic=1):
    material = bpy.data.materials.new(name)
    material.diffuse_color = (*linear_hex(color), 1)
    material.use_nodes = True
    nodes = material.node_tree.nodes
    shader = nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*linear_hex(color), 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Coat Weight"].default_value = 0.25
    shader.inputs["Coat Roughness"].default_value = 0.22

    # Microscopic satin finish, rather than visible decorative noise.
    noise = nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 480
    noise.inputs["Detail"].default_value = 2
    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.055
    bump.inputs["Distance"].default_value = 0.015
    material.node_tree.links.new(noise.outputs["Fac"], bump.inputs["Height"])
    material.node_tree.links.new(bump.outputs["Normal"], shader.inputs["Normal"])
    return material


def backdrop_material():
    material = bpy.data.materials.new("Graphite cyclorama · calm portrait pocket")
    material.use_nodes = True
    nodes = material.node_tree.nodes
    nodes.clear()
    output = nodes.new("ShaderNodeOutputMaterial")
    emission = nodes.new("ShaderNodeEmission")
    texture = nodes.new("ShaderNodeTexCoord")
    separate = nodes.new("ShaderNodeSeparateXYZ")
    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.2
    ramp.color_ramp.elements[0].color = (*linear_hex("1b1c1e"), 1)
    ramp.color_ramp.elements[1].position = 0.8
    ramp.color_ramp.elements[1].color = (*linear_hex("24282b"), 1)
    material.node_tree.links.new(texture.outputs["Generated"], separate.inputs[0])
    material.node_tree.links.new(separate.outputs["Z"], ramp.inputs[0])
    material.node_tree.links.new(ramp.outputs["Color"], emission.inputs[0])
    material.node_tree.links.new(emission.outputs[0], output.inputs[0])
    return material


def ribbon(scene, name, center, radii, width, phase, depth, materials, rotation=0):
    """Closed twisted band, with rounded solid cross section and two finishes."""
    ring_steps = 320
    profile_steps = 20
    vertices, faces, face_materials = [], [], []
    points = []
    cx, cy, cz = center
    rx, rz = radii
    rotation = math.radians(rotation)

    for i in range(ring_steps):
        t = 2 * math.pi * i / ring_steps
        x, z = rx * math.cos(t), rz * math.sin(t)
        px = cx + x * math.cos(rotation) - z * math.sin(rotation)
        pz = cz + x * math.sin(rotation) + z * math.cos(rotation)
        py = cy + depth * math.sin(2 * t + phase)
        p = Vector((px, py, pz))
        radial = Vector((rz * math.cos(t), 0, rx * math.sin(t))).normalized()
        radial = Vector((radial.x * math.cos(rotation) - radial.z * math.sin(rotation), 0,
                         radial.x * math.sin(rotation) + radial.z * math.cos(rotation)))
        twist = t + phase + 0.55 * math.sin(2 * t - phase)
        transverse = radial * math.cos(twist) + Vector((0, 1, 0)) * math.sin(twist)
        thickness_axis = radial * -math.sin(twist) + Vector((0, 1, 0)) * math.cos(twist)
        w = width * (1 + 0.44 * math.sin(t - phase) + 0.21 * math.sin(3 * t + phase))
        points.append((p, transverse, w))

        # A squashed superellipse makes a broad face with gently rounded lips.
        for j in range(profile_steps):
            a = 2 * math.pi * j / profile_steps
            cos_a, sin_a = math.cos(a), math.sin(a)
            u = math.copysign(abs(cos_a) ** 0.42, cos_a) * w / 2
            v = math.copysign(abs(sin_a) ** 0.42, sin_a) * 0.075
            vertices.append(p + transverse * u + thickness_axis * v)

    for i in range(ring_steps):
        nxt = (i + 1) % ring_steps
        for j in range(profile_steps):
            faces.append((i * profile_steps + j, nxt * profile_steps + j,
                          nxt * profile_steps + (j + 1) % profile_steps,
                          i * profile_steps + (j + 1) % profile_steps))
            angle = 2 * math.pi * (j + 0.5) / profile_steps
            face_materials.append(1 if math.sin(angle) > 0.4 else 0)

    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    for material in materials:
        mesh.materials.append(material)
    for polygon, index in zip(mesh.polygons, face_materials):
        polygon.use_smooth = True
        polygon.material_index = index

    # A machined reflective lip makes the contour readable against charcoal.
    for sign in (-1, 1):
        curve = bpy.data.curves.new(f"{name} · machined lip {sign}", "CURVE")
        curve.dimensions = "3D"
        curve.bevel_depth = 0.016
        curve.bevel_resolution = 3
        spline = curve.splines.new("POLY")
        spline.points.add(ring_steps - 1)
        spline.use_cyclic_u = True
        for point, (p, transverse, w) in zip(spline.points, points):
            point.co = (*(p + transverse * w / 2 * sign), 1)
        edge = bpy.data.objects.new(curve.name, curve)
        scene.collection.objects.link(edge)
        curve.materials.append(materials[2])
    return obj


def area(scene, name, position, target, color, power, size, size_y):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = power
    data.color = color
    data.shape = "RECTANGLE"
    data.size = size
    data.size_y = size_y
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = position
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


def create_scene(name, mobile, args, materials):
    scene = bpy.data.scenes.new(name)
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 24 if args.preview else args.samples
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.045 if args.preview else 0.025
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 4
    scene.cycles.device = "GPU" if args.device == "METAL" else "CPU"
    scene.render.resolution_x = 780 if mobile else 2560
    scene.render.resolution_y = 1300 if mobile else 1440
    scene.render.resolution_percentage = 40 if args.preview else 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGB"
    scene.render.image_settings.color_depth = "8"
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0.45
    scene.world = bpy.data.worlds.new(f"{name} studio world")
    scene.world.use_nodes = True
    scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.3

    camera_data = bpy.data.cameras.new(f"{name} orthographic camera")
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = 10 if mobile else 16
    camera_data.lens = 55
    camera = bpy.data.objects.new(camera_data.name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = (0, -24, 0)
    camera.rotation_euler = (Vector((0, 0, 0)) - camera.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera

    mesh = bpy.data.meshes.new(f"{name} backdrop")
    mesh.from_pydata([(-30, 3.5, -25), (30, 3.5, -25), (30, 3.5, 25), (-30, 3.5, 25)], [], [(0, 1, 2, 3)])
    backdrop = bpy.data.objects.new(mesh.name, mesh)
    scene.collection.objects.link(backdrop)
    mesh.materials.append(materials[3])

    if mobile:
        ribbon(scene, "Lower left folded ribbon", (-4.1, 0, -2.2), (2.7, 4.5), 1.25, 0.35, 0.75, materials, -14)
        ribbon(scene, "Lower right folded ribbon", (4.0, 0.2, -2.6), (2.65, 3.2), 1.3, -0.7, 0.85, materials, 18)
    else:
        ribbon(scene, "Monumental left folded ribbon", (-7.3, 0, -0.3), (3.45, 5.0), 1.8, 0.35, 1.1, materials, -19)
        ribbon(scene, "Monumental right folded ribbon", (8.8, 0.2, -0.85), (3.35, 4.65), 2.1, -0.7, 1.0, materials, 22)

    area(scene, "Cold vertical softbox", (-4.5, -6.5, 3.0), (-5.5, 0, 0), (0.62, 0.8, 1.0), 1600, 2.0, 8.0)
    area(scene, "Top silk softbox", (0.5, -3.0, 7.5), (0, 0, 0), (0.92, 0.92, 0.9), 1900, 10.0, 2.5)
    area(scene, "Right cold rim", (7.5, -3.5, 2.0), (7.8, 0, 0), (0.6, 0.82, 1.0), 1300, 1.1, 7.0)
    area(scene, "Burgundy lower bounce", (-6.2, -1.0, -5.4), (-5, 0, -1), (1, 0.045, 0.11), 180, 3.0, 4.0)
    area(scene, "Wine interior fill", (8.5, 0.8, -4.0), (6.0, 0, -1.0), (1, 0.09, 0.16), 260, 4.0, 4.0)
    return scene


def main():
    args = arguments()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    if args.device == "METAL":
        preferences = bpy.context.preferences.addons["cycles"].preferences
        preferences.compute_device_type = "METAL"
        preferences.get_devices()
        devices = [device for device in preferences.devices if device.type == "METAL"]
        if not devices:
            print("Metal unavailable; using Cycles CPU.", flush=True)
            args.device = "CPU"
        for device in preferences.devices:
            device.use = device.type == "METAL"

    materials = [
        metal("Satin graphite exterior", "454d55", 0.29),
        metal("Burgundy enamel interior", "930927", 0.23, 0.8),
        metal("Polished icy contour", "9fc5d3", 0.2),
        backdrop_material(),
    ]
    compositions = [
        ("desktop", create_scene("About · Desktop", False, args, materials)),
        ("mobile", create_scene("About · Mobile", True, args, materials)),
    ]
    suffix = "-preview" if args.preview else ""
    for variant, scene in compositions:
        scene.render.filepath = str(args.output_dir / f"about-background-{variant}{suffix}.png")
    bpy.context.window.scene = compositions[0][1]
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output_dir / "about-background.blend"))
    for variant, scene in compositions:
        if args.only and variant != args.only:
            continue
        print(f"Rendering {variant} → {scene.render.filepath}", flush=True)
        bpy.ops.render.render(write_still=True, scene=scene.name)
    print(f"Done. Editable Blender scenes: {args.output_dir / 'about-background.blend'}", flush=True)


if __name__ == "__main__":
    main()
