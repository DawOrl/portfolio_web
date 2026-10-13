"""Show the backdrop construction stages in Blender's current window.

Run in Blender's Python console:
  import runpy; runpy.run_path('/absolute/path/to/show_about_process.py')

The render scene is appended as a separate scene. Existing work stays available
in the scene selector. Space replays the stages; the timeline markers identify
geometry, materials and lighting. This is a staged breakdown of the scene.
"""

from pathlib import Path

import bpy


PROJECT = Path(__file__).resolve().parents[2] if '__file__' in globals() else Path('/Users/dawid/Dev/Praca/portfolio_web')
SOURCE = PROJECT / 'design/blender/about-background.blend'
WINDOW = bpy.context.window

with bpy.data.libraries.load(str(SOURCE), link=False) as (available, requested):
    requested.scenes = [name for name in available.scenes if name == 'About · Desktop']

if not requested.scenes or requested.scenes[0] is None:
    raise RuntimeError('Render the backdrop before showing its construction stages.')

PROCESS = requested.scenes[0]
PROCESS.name = 'About · Proces powstawania'
PROCESS.render.engine = 'CYCLES'
PROCESS.cycles.samples = 16
PROCESS.cycles.preview_samples = 16
PROCESS.cycles.use_preview_denoising = True
PROCESS.frame_start = 1
PROCESS.frame_end = 210
PROCESS.render.fps = 24
WINDOW.scene = PROCESS

for frame, label in [(1, '1. Geometria wstęgi'), (55, '2. Druga forma i krawędzie'),
                     (105, '3. Grafit i burgund'), (155, '4. Oświetlenie studyjne')]:
    marker = PROCESS.timeline_markers.new(label)
    marker.frame = frame

for obj in PROCESS.objects:
    lowered = obj.name.lower()
    if 'left folded ribbon' in lowered:
        reveal = 1 if obj.type == 'MESH' else 55
    elif 'right folded ribbon' in lowered:
        reveal = 55
    elif obj.type == 'LIGHT' or 'backdrop' in lowered:
        reveal = 155
    else:
        continue
    for frame, hidden in [(1, reveal > 1), (max(1, reveal - 1), reveal > 1), (reveal, False)]:
        obj.hide_viewport = hidden
        obj.keyframe_insert(data_path='hide_viewport', frame=frame)

VIEW = next((area for area in WINDOW.screen.areas if area.type in {'VIEW_3D', 'CONSOLE'}), None)
if VIEW is not None:
    VIEW.type = 'VIEW_3D'
    space = VIEW.spaces.active
    space.region_3d.view_perspective = 'CAMERA'
    space.region_3d.view_camera_zoom = 18
    space.overlay.show_overlays = True

def update_stage(scene, _depsgraph=None):
    if (scene != PROCESS or VIEW is None
            or not any(area == VIEW for area in WINDOW.screen.areas)
            or VIEW.type != 'VIEW_3D'):
        return
    frame = scene.frame_current
    space = VIEW.spaces.active
    if frame < 105:
        space.shading.type = 'WIREFRAME'
        space.overlay.show_overlays = True
        label = 'Geometria wstęgi' if frame < 55 else 'Druga forma i polerowane krawędzie'
    elif frame < 155:
        space.shading.type = 'MATERIAL'
        space.overlay.show_overlays = True
        space.shading.use_scene_world = False
        space.shading.use_scene_lights = False
        label = 'Materiały: satynowy grafit, burgund, chłodny metal'
    else:
        space.shading.type = 'RENDERED'
        space.shading.use_scene_world_render = True
        space.shading.use_scene_lights_render = True
        space.overlay.show_overlays = False
        label = 'Finalna kompozycja i światło studyjne'
    VIEW.header_text_set(f'{label} — Spacja: odtwórz / zatrzymaj; znaczniki na osi czasu: etapy')
    VIEW.tag_redraw()

update_stage._about_process = True
for callback in list(bpy.app.handlers.frame_change_post):
    if getattr(callback, '_about_process', False):
        bpy.app.handlers.frame_change_post.remove(callback)
bpy.app.handlers.frame_change_post.append(update_stage)
PROCESS.frame_set(1)

def stop_at_finish():
    if WINDOW.scene != PROCESS:
        if update_stage in bpy.app.handlers.frame_change_post:
            bpy.app.handlers.frame_change_post.remove(update_stage)
        return None
    if PROCESS.frame_current >= 205 and WINDOW.screen.is_animation_playing:
        with bpy.context.temp_override(window=WINDOW):
            bpy.ops.screen.animation_play()
        PROCESS.frame_set(210)
    return 0.1

if VIEW is not None:
    with bpy.context.temp_override(window=WINDOW, area=VIEW):
        if not WINDOW.screen.is_animation_playing:
            bpy.ops.screen.animation_play()
    bpy.app.timers.register(stop_at_finish, first_interval=0.1)

print('About backdrop stages opened. Space replays; original scenes remain in the scene selector.')
