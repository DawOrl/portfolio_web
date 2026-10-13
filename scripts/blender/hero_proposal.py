"""Render a standalone asymmetric metal ribbon for the hero proposal.

  blender --background --factory-startup --python scripts/blender/hero_proposal.py

Reuses the About scene's procedural materials, band geometry and studio lights.
Outputs a transparent 1000 × 1100 PNG and an independent editable .blend.
"""

import importlib.util
import math
from pathlib import Path
import sys

import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "design" / "hero-proposal"
spec = importlib.util.spec_from_file_location("about_materials", Path(__file__).with_name("about_background.py"))
about = importlib.util.module_from_spec(spec)
sys.dont_write_bytecode = True
spec.loader.exec_module(about)


def sculpt_band(scene, materials):
    rx, rz = 2.25, 3.65
    about.ribbon(scene, "Folded graphite · asymmetric closed loop", (0, 0, 0),
                 (rx, rz), 1.35, 0.6, 0.95, materials)
    rotation = Matrix.Rotation(math.radians(-18), 4, "Y")

    def shaped(point, t):
        # Two harmonics form a rounded, lopsided D silhouette rather than an ellipse.
        displacement = Vector((0.32 * rx * math.cos(2 * t),
                               0.25 * math.sin(3 * t),
                               -0.2 * rz * math.sin(2 * t)))
        return rotation @ (Vector(point) + displacement)

    for obj in scene.objects:
        if obj.type == "MESH":
            for vertex in obj.data.vertices:
                t = 2 * math.pi * (vertex.index // 20) / 320
                vertex.co = shaped(vertex.co, t)
            obj.data.update()
        elif obj.type == "CURVE":
            for spline in obj.data.splines:
                for index, point in enumerate(spline.points):
                    point.co = (*shaped(point.co[:3], 2 * math.pi * index / 320), 1)


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    scene = bpy.data.scenes.new("Hero proposal · folded graphite")
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 48
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.025
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 4
    scene.render.resolution_x = 1000
    scene.render.resolution_y = 1100
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.render.filepath = str(OUTPUT / "hero-form.png")
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0.45

    preferences = bpy.context.preferences.addons["cycles"].preferences
    try:
        preferences.compute_device_type = "METAL"
        preferences.get_devices()
        metal_devices = [device for device in preferences.devices if device.type == "METAL"]
        for device in preferences.devices:
            device.use = device.type == "METAL"
        scene.cycles.device = "GPU" if metal_devices else "CPU"
    except TypeError:
        scene.cycles.device = "CPU"

    scene.world = bpy.data.worlds.new("Hero · studio reflection world")
    scene.world.use_nodes = True
    scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.3

    materials = [
        about.metal("Satin graphite exterior", "454d55", 0.29),
        about.metal("Burgundy enamel interior", "930927", 0.23, 0.8),
        about.metal("Polished icy contour", "9fc5d3", 0.2),
    ]
    sculpt_band(scene, materials)

    vertices = [vertex.co for obj in scene.objects if obj.type == "MESH" for vertex in obj.data.vertices]
    min_x, max_x = min(p.x for p in vertices), max(p.x for p in vertices)
    min_z, max_z = min(p.z for p in vertices), max(p.z for p in vertices)
    center = Vector(((min_x + max_x) / 2, 0, (min_z + max_z) / 2))
    camera_data = bpy.data.cameras.new("Hero · full object orthographic")
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = max((max_z - min_z) / 0.9, (max_x - min_x) / (1000 / 1100 * 0.9))
    camera = bpy.data.objects.new(camera_data.name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = center + Vector((0, -24, 0))
    camera.rotation_euler = (center - camera.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera

    about.area(scene, "Cold vertical softbox", (-4.5, -6.5, 3), center, (0.62, 0.8, 1), 1600, 2, 8)
    about.area(scene, "Top silk softbox", (0.5, -3, 7.5), center, (0.92, 0.92, 0.9), 1900, 10, 2.5)
    about.area(scene, "Right cold rim", (6, -3.5, 2), center, (0.6, 0.82, 1), 1300, 1.1, 7)
    about.area(scene, "Burgundy lower bounce", (-4, -1, -5.4), center, (1, 0.045, 0.11), 180, 3, 4)

    bpy.context.window.scene = scene
    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT / "hero-form.blend"))
    bpy.ops.render.render(write_still=True, scene=scene.name)
    print(f"Hero proposal ready: {scene.render.filepath}", flush=True)


if __name__ == "__main__":
    main()
