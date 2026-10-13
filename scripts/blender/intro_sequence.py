"""Render the intro film: the hero ribbon drawn as one icy line, then unfurled into form.

Run from the repository root:
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/intro_sequence.py -- --preview
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/intro_sequence.py -- --check
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/intro_sequence.py
  blender --background --factory-startup --python-exit-code 1 \
    --python scripts/blender/intro_sequence.py -- --hero

The last frame is the hero sculpture: same geometry as hero_proposal.py and the same
camera position. Intro frames are framed PAD times wider than the hero still, so the
page can scale the final frame onto /hero-form-blender.webp without a visible cut.
"""

import argparse
import importlib.util
import math
from pathlib import Path
import sys

import bmesh
import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Matrix, Vector
import numpy as np


ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location("about_materials", Path(__file__).with_name("about_background.py"))
about = importlib.util.module_from_spec(spec)
sys.dont_write_bytecode = True
spec.loader.exec_module(about)

RING, PROFILE = 320, 20
FRAMES = 72
PAD = 1.3            # intro frame extent relative to the hero framing
START = 0.62         # loop position where the line starts
LINE_RADIUS = 2.4    # lip bevel multiplier while the form is still a single line
END_LENS = 200       # hero still uses END_LENS * PAD from the same position
SIZE = (960, 1056)   # 10:11 like the hero still; packed side by side to 1920 x 1056


def arguments():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preview", action="store_true", help="35% resolution, 10 samples")
    parser.add_argument("--check", action="store_true", help="Print projected bounds, no render")
    parser.add_argument("--hero", action="store_true", help="Render only the final hero still")
    parser.add_argument("--frames", help="Comma separated frame numbers to render")
    parser.add_argument("--samples", type=int, default=40)
    parser.add_argument("--output-dir", type=Path, default=ROOT / "design" / "intro")
    extra = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    return parser.parse_args(extra)


def clamp(x):
    return np.clip(x, 0.0, 1.0)


def smooth(x):
    x = clamp(x)
    return x * x * (3 - 2 * x)


def in_out(x):
    x = float(clamp(x))
    return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2


def out(x, power=3.0):
    return 1 - (1 - float(clamp(x))) ** power


def hero_rings():
    """Ring centres, cross-section axes and widths of the hero sculpture."""
    rx, rz, width, phase, depth = 2.25, 3.65, 1.35, 0.6, 0.95
    rotation = Matrix.Rotation(math.radians(-18), 3, "Y")
    centres, transverses, normals, widths = [], [], [], []
    for i in range(RING):
        t = 2 * math.pi * i / RING
        p = Vector((rx * math.cos(t), depth * math.sin(2 * t + phase), rz * math.sin(t)))
        radial = Vector((rz * math.cos(t), 0, rx * math.sin(t))).normalized()
        twist = t + phase + 0.55 * math.sin(2 * t - phase)
        up = Vector((0, 1, 0))
        transverse = radial * math.cos(twist) + up * math.sin(twist)
        normal = radial * -math.sin(twist) + up * math.cos(twist)
        # Same two harmonics as hero_proposal.sculpt_band: a lopsided D, not an ellipse.
        shift = Vector((0.32 * rx * math.cos(2 * t), 0.25 * math.sin(3 * t), -0.2 * rz * math.sin(2 * t)))
        centres.append(rotation @ (p + shift))
        transverses.append(rotation @ transverse)
        normals.append(rotation @ normal)
        widths.append(width * (1 + 0.44 * math.sin(t - phase) + 0.21 * math.sin(3 * t + phase)))
    return np.array(centres), np.array(transverses), np.array(normals), np.array(widths)


CENTRES, TRANSVERSES, NORMALS, WIDTHS = hero_rings()
ANGLES = 2 * np.pi * np.arange(PROFILE) / PROFILE
PROFILE_U = np.sign(np.cos(ANGLES)) * np.abs(np.cos(ANGLES)) ** 0.42
PROFILE_V = np.sign(np.sin(ANGLES)) * np.abs(np.sin(ANGLES)) ** 0.42
DISTANCE = (np.arange(RING) / RING - START) % 1.0


def timeline(tau):
    """All animated quantities for normalised time tau in [0, 1]."""
    draw = float(clamp(tau / 0.45))
    unfurl = in_out((tau - 0.3) / 0.45)
    return {
        # Half linear, half eased: the pen moves from the very first frame.
        "grow": 0.5 * draw + 0.5 * in_out(draw),
        "unfurl": unfurl,
        "spin": -170 * (1 - out(tau, 2.4)),
        "tilt": 28 * (1 - out(tau, 2.2)),
        "zoom": in_out(tau / 0.85),
        "glow": 1 - float(smooth((tau - 0.28) / 0.3)),
        "sweep": float(np.sin(np.pi * clamp((tau - 0.45) / 0.5)) ** 2),
        "sweep_x": -7 + 14 * float(clamp((tau - 0.45) / 0.5)),
    }


def ring_pose(tau):
    state = timeline(tau)
    grow, unfurl = state["grow"], state["unfurl"]
    close = float(smooth((grow - 0.86) / 0.14))
    drawn = DISTANCE <= grow
    head = 1 - (1 - smooth((grow - DISTANCE) / 0.05)) * (1 - close)
    tail = 1 - (1 - smooth(DISTANCE / 0.05)) * (1 - close)
    taper = np.where(drawn, head * tail, 0.0)

    k = 0.7
    width = smooth(unfurl * (1 + k) - DISTANCE * k)

    tip_index = ((START + grow) % 1.0) * RING
    lower = int(tip_index) % RING
    blend = tip_index - int(tip_index)
    tip = CENTRES[lower] * (1 - blend) + CENTRES[(lower + 1) % RING] * blend
    centres = np.where(drawn[:, None], CENTRES, tip)

    half_width = WIDTHS / 2 * width * taper
    half_thickness = 0.075 * smooth(width * 2.5) * taper
    lip_radius = taper * (LINE_RADIUS + (1 - LINE_RADIUS) * width)
    spark = float(smooth(tau / 0.03) * (1 - smooth((grow - 0.88) / 0.12)))
    return centres, half_width, half_thickness, lip_radius, (tip, spark)


class Ribbon:
    def __init__(self, scene, materials):
        centres, half_width, half_thickness, *_ = ring_pose(1.0)
        vertices = self._vertices(centres, half_width, half_thickness)
        faces, face_materials = [], []
        for i in range(RING):
            nxt = (i + 1) % RING
            for j in range(PROFILE):
                faces.append((i * PROFILE + j, nxt * PROFILE + j,
                              nxt * PROFILE + (j + 1) % PROFILE, i * PROFILE + (j + 1) % PROFILE))
                face_materials.append(1 if math.sin(2 * math.pi * (j + 0.5) / PROFILE) > 0.4 else 0)
        self.mesh = bpy.data.meshes.new("Intro ribbon · graphite and burgundy")
        self.mesh.from_pydata(vertices.tolist(), [], faces)
        for material in materials[:2]:
            self.mesh.materials.append(material)
        for polygon, index in zip(self.mesh.polygons, face_materials):
            polygon.use_smooth = True
            polygon.material_index = index
        self.objects = [bpy.data.objects.new(self.mesh.name, self.mesh)]

        self.lips = []
        for sign in (-1, 1):
            curve = bpy.data.curves.new(f"Intro ribbon · icy lip {sign}", "CURVE")
            curve.dimensions = "3D"
            curve.bevel_depth = 0.016
            curve.bevel_resolution = 3
            spline = curve.splines.new("POLY")
            spline.points.add(RING - 1)
            spline.use_cyclic_u = True
            curve.materials.append(materials[2])
            self.lips.append((sign, spline))
            self.objects.append(bpy.data.objects.new(curve.name, curve))

        # The pen point: a small emissive bead riding the head of the line.
        bead = bmesh.new()
        bmesh.ops.create_uvsphere(bead, u_segments=24, v_segments=12, radius=0.07)
        sphere = bpy.data.meshes.new("Intro · pen point")
        bead.to_mesh(sphere)
        bead.free()
        self.spark = bpy.data.objects.new(sphere.name, sphere)
        glow = bpy.data.materials.new("Pen point light")
        glow.use_nodes = True
        nodes = glow.node_tree.nodes
        nodes.clear()
        emission = nodes.new("ShaderNodeEmission")
        emission.inputs["Color"].default_value = (0.78, 0.92, 1, 1)
        emission.inputs["Strength"].default_value = 40
        output = nodes.new("ShaderNodeOutputMaterial")
        glow.node_tree.links.new(emission.outputs[0], output.inputs[0])
        self.spark.data.materials.append(glow)
        self.objects.append(self.spark)
        for obj in self.objects:
            scene.collection.objects.link(obj)

    @staticmethod
    def _vertices(centres, half_width, half_thickness):
        u = PROFILE_U[None, :, None] * half_width[:, None, None]
        v = PROFILE_V[None, :, None] * half_thickness[:, None, None]
        rows = centres[:, None, :] + TRANSVERSES[:, None, :] * u + NORMALS[:, None, :] * v
        return rows.reshape(-1, 3)

    def pose(self, tau):
        centres, half_width, half_thickness, lip_radius, (tip, spark) = ring_pose(tau)
        self.spark.location = tip
        self.spark.scale = (spark,) * 3
        self.spark.hide_render = spark < 0.01
        self.mesh.vertices.foreach_set("co", self._vertices(centres, half_width, half_thickness).ravel())
        self.mesh.update()
        for sign, spline in self.lips:
            points = centres + TRANSVERSES * (half_width * sign)[:, None]
            spline.points.foreach_set("co", np.hstack([points, np.ones((RING, 1))]).ravel())
            spline.points.foreach_set("radius", lip_radius)
            spline.id_data.update_tag()


def configure(scene, args):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 10 if args.preview else args.samples
    scene.cycles.use_denoising = True
    scene.cycles.adaptive_threshold = 0.05 if args.preview else 0.02
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 2
    scene.cycles.glossy_bounces = 4
    scene.render.resolution_x, scene.render.resolution_y = SIZE
    scene.render.resolution_percentage = 35 if args.preview else 100
    scene.render.film_transparent = True
    scene.render.use_motion_blur = True
    scene.render.motion_blur_shutter = 0.5
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.image_settings.color_depth = "8"
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"
    scene.view_settings.exposure = 0.45
    scene.frame_start, scene.frame_end = 1, FRAMES
    scene.render.fps = 30

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

    scene.world = bpy.data.worlds.new("Intro · studio reflection world")
    scene.world.use_nodes = True
    scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.08, 0.095, 0.11, 1)
    scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.3


def build(args):
    scene = bpy.data.scenes.new("Intro · line to form")
    configure(scene, args)
    materials = [
        about.metal("Satin graphite exterior", "454d55", 0.29),
        about.metal("Burgundy enamel interior", "930927", 0.23, 0.8),
        about.metal("Polished icy contour", "9fc5d3", 0.2),
    ]
    ribbon = Ribbon(scene, materials)
    # While it is still a line, the contour glows; as it becomes form it turns to metal.
    lip_shader = materials[2].node_tree.nodes["Principled BSDF"]
    lip_shader.inputs["Emission Color"].default_value = (0.36, 0.72, 1, 1)

    vertices = Ribbon._vertices(*ring_pose(1.0)[:3])
    low, high = vertices.min(axis=0), vertices.max(axis=0)
    center = Vector(((low[0] + high[0]) / 2, 0, (low[2] + high[2]) / 2))
    # Same fit as hero_proposal: the form fills 90 % of the hero frame.
    hero_extent = max((high[2] - low[2]) / 0.9, (high[0] - low[0]) / (SIZE[0] / SIZE[1] * 0.9))

    rig = bpy.data.objects.new("Intro rig · spin and tilt", None)
    scene.collection.objects.link(rig)
    rig.location = center
    for obj in ribbon.objects:
        obj.parent = rig
        obj.matrix_parent_inverse = Matrix.Translation(-center)

    camera_data = bpy.data.cameras.new("Intro · dolly zoom")
    camera_data.sensor_fit = "VERTICAL"
    camera_data.sensor_height = 36
    camera_data.clip_end = 1000
    camera = bpy.data.objects.new(camera_data.name, camera_data)
    scene.collection.objects.link(camera)
    camera.rotation_euler = Vector((0, 1, 0)).to_track_quat("-Z", "Y").to_euler()
    scene.camera = camera

    about.area(scene, "Cold vertical softbox", (-4.5, -6.5, 3), center, (0.62, 0.8, 1), 1600, 2, 8)
    about.area(scene, "Top silk softbox", (0.5, -3, 7.5), center, (0.92, 0.92, 0.9), 1900, 10, 2.5)
    about.area(scene, "Right cold rim", (6, -3.5, 2), center, (0.6, 0.82, 1), 1300, 1.1, 7)
    about.area(scene, "Burgundy lower bounce", (-4, -1, -5.4), center, (1, 0.045, 0.11), 180, 3, 4)
    about.area(scene, "Travelling strip", (-7, -5, 1), center, (0.85, 0.93, 1), 0, 0.35, 12)
    sweep = scene.objects["Travelling strip"]

    def camera_at(tau, lens_end=END_LENS, extent_end=hero_extent * PAD):
        zoom = timeline(tau)["zoom"]
        lens = 26 * (lens_end / 26) ** zoom
        extent = extent_end * (0.84 + 0.16 * zoom)
        return lens, extent * lens / 36

    # One linear key per frame keeps the eased curves exact and feeds motion blur.
    bpy.context.preferences.edit.keyframe_new_interpolation_type = "LINEAR"
    for frame in range(1, FRAMES + 1):
        tau = (frame - 1) / (FRAMES - 1)
        state = timeline(tau)
        rig.rotation_euler = (math.radians(state["tilt"]), 0, math.radians(state["spin"]))
        rig.keyframe_insert("rotation_euler", frame=frame)
        lens, distance = camera_at(tau)
        camera_data.lens = lens
        camera_data.keyframe_insert("lens", frame=frame)
        camera.location = center + Vector((0, -distance, 0))
        camera.keyframe_insert("location", frame=frame)
        lip_shader.inputs["Emission Strength"].default_value = 0.9 * state["glow"]
        lip_shader.inputs["Emission Strength"].keyframe_insert("default_value", frame=frame)
        sweep.data.energy = 2600 * state["sweep"]
        sweep.data.keyframe_insert("energy", frame=frame)
        sweep.location = (state["sweep_x"], -5, 1.5)
        sweep.rotation_euler = (Vector(center) - sweep.location).to_track_quat("-Z", "Y").to_euler()
        sweep.keyframe_insert("location", frame=frame)
        sweep.keyframe_insert("rotation_euler", frame=frame)

    def follow(scene, *_):
        frame = scene.frame_current + scene.frame_subframe
        ribbon.pose(min(max((frame - 1) / (FRAMES - 1), 0.0), 1.0))

    bpy.app.handlers.frame_change_pre.append(follow)
    return scene, ribbon, camera, hero_extent


def check(scene, ribbon, camera):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    worst = [1.0, 1.0, 0.0, 0.0]
    for frame in range(1, FRAMES + 1):
        scene.frame_set(frame)
        depsgraph.update()
        mesh_object = ribbon.objects[0].evaluated_get(depsgraph)
        world = np.array(mesh_object.matrix_world)
        co = np.empty(len(ribbon.mesh.vertices) * 3)
        ribbon.mesh.vertices.foreach_get("co", co)
        co = co.reshape(-1, 3)[::3]
        points = co @ world[:3, :3].T + world[:3, 3]
        projected = np.array([world_to_camera_view(scene, camera, Vector(p))[:2] for p in points])
        lo, hi = projected.min(axis=0), projected.max(axis=0)
        worst = [min(worst[0], lo[0]), min(worst[1], lo[1]), max(worst[2], hi[0]), max(worst[3], hi[1])]
        if frame in (1, 12, 24, 36, 48, 60, 72):
            print(f"frame {frame:3d}: x {lo[0]:.3f}-{hi[0]:.3f}  y {lo[1]:.3f}-{hi[1]:.3f}", flush=True)
    print(f"worst: x {worst[0]:.3f}-{worst[2]:.3f}  y {worst[1]:.3f}-{worst[3]:.3f}", flush=True)


def main():
    args = arguments()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    scene, ribbon, camera, hero_extent = build(args)
    bpy.context.window.scene = scene

    if args.check:
        check(scene, ribbon, camera)
        return

    if args.hero:
        # Same camera position, narrower lens: an exact centre crop of the last frame.
        scene.frame_set(FRAMES)
        scene.animation_data_clear() if scene.animation_data else None
        camera.data.animation_data_clear()
        camera.data.lens = END_LENS * PAD
        scene.render.resolution_x, scene.render.resolution_y = 1000, 1100
        scene.render.resolution_percentage = 100
        scene.render.use_motion_blur = False
        scene.cycles.samples = max(args.samples, 64)
        scene.render.filepath = str(args.output_dir / "hero-form.png")
        bpy.ops.render.render(write_still=True, scene=scene.name)
        print(f"Hero still ready: {scene.render.filepath}", flush=True)
        return

    scene.frame_set(FRAMES)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output_dir / "intro-sequence.blend"))
    folder = args.output_dir / ("frames-preview" if args.preview else "frames")
    folder.mkdir(exist_ok=True)
    frames = [int(f) for f in args.frames.split(",")] if args.frames else range(1, FRAMES + 1)
    for frame in frames:
        scene.frame_set(frame)
        scene.render.filepath = str(folder / f"{frame:03d}.png")
        bpy.ops.render.render(write_still=True, scene=scene.name)
        print(f"frame {frame}/{FRAMES}", flush=True)


if __name__ == "__main__":
    main()
