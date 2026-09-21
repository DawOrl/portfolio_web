import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/** One small, on-demand scene. No external textures, models or continuous idle loop. */
export function mountMonogram(host: HTMLElement, canvas: HTMLCanvasElement) {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 600);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.15;
  room.dispose();
  pmrem.dispose();

  const key = new THREE.DirectionalLight(0xffeee3, 3);
  key.position.set(-40, 70, 90);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 2);
  rim.position.set(70, 20, -20);
  scene.add(rim);

  const face = new THREE.MeshPhysicalMaterial({
    color: "#a00c30",
    metalness: 0.45,
    roughness: 0.27,
    clearcoat: 0.45,
    clearcoatRoughness: 0.3,
  });
  const metal = new THREE.MeshStandardMaterial({
    color: "#bcb3ac",
    metalness: 1,
    roughness: 0.2,
  });
  const accentFace = new THREE.MeshStandardMaterial({
    color:
      getComputedStyle(host).getPropertyValue("--accent-cool").trim() ||
      "#9fc5d3",
    metalness: 0.45,
    roughness: 0.24,
  });
  const geometries: THREE.BufferGeometry[] = [];
  const model = new THREE.Group();
  scene.add(model);
  const letterD = new THREE.Shape();
  letterD.moveTo(30, -8);
  letterD.lineTo(38, -8);
  letterD.lineTo(38, -44);
  letterD.bezierCurveTo(38, -53.94, 29.94, -62, 20, -62);
  letterD.bezierCurveTo(10.06, -62, 2, -53.94, 2, -44);
  letterD.bezierCurveTo(2, -34.06, 10.06, -26, 20, -26);
  letterD.lineTo(30, -26);
  letterD.closePath();
  const dHole = new THREE.Path();
  dHole.absarc(20, -44, 10, 0, Math.PI * 2, true);
  letterD.holes.push(dHole);
  const letterO = new THREE.Shape();
  letterO.absarc(61, -44, 18, 0, Math.PI * 2, false);
  const oHole = new THREE.Path();
  oHole.absarc(61, -44, 10, 0, Math.PI * 2, true);
  letterO.holes.push(oHole);
  const dot = new THREE.Shape();
  dot.moveTo(77, -8);
  dot.lineTo(85, -8);
  dot.lineTo(85, -16);
  dot.lineTo(77, -16);
  dot.closePath();

  [letterD, letterO, dot].forEach((shape, index) => {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 9,
      steps: 1,
      curveSegments: 48,
      bevelEnabled: true,
      bevelThickness: 0.65,
      bevelSize: 0.55,
      bevelSegments: 4,
    });
    geometry.translate(-43, 35, -4.5);
    geometries.push(geometry);
    model.add(
      new THREE.Mesh(geometry, [index === 2 ? accentFace : face, metal]),
    );
  });

  const baseX = 0.17;
  const baseY = -0.42;
  let targetX = baseX;
  let targetY = baseY;
  model.rotation.set(baseX, baseY, -0.075);
  let frame = 0;
  let visible = false;
  let disposed = false;
  let contextLost = false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const render = () => {
    frame = 0;
    if (disposed || contextLost || !visible || document.hidden) return;
    model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetX, 0.12);
    model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetY, 0.12);
    renderer.render(scene, camera);
    host.dataset.ready = "true";
    if (
      Math.abs(model.rotation.x - targetX) +
        Math.abs(model.rotation.y - targetY) >
      0.0005
    ) {
      frame = requestAnimationFrame(render);
    }
  };
  const requestRender = () => {
    if (!frame && !disposed && !contextLost && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.set(
      0,
      0,
      Math.max(90, 110 / camera.aspect) /
        (2 * Math.tan(THREE.MathUtils.degToRad(16))),
    );
    camera.updateProjectionMatrix();
    requestRender();
  };
  const onMove = (event: PointerEvent) => {
    if (reduce.matches || !pointer.matches || event.pointerType !== "mouse")
      return;
    const bounds = host.getBoundingClientRect();
    targetY =
      baseY + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.5;
    targetX =
      baseX + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.3;
    requestRender();
  };
  const reset = () => {
    targetX = baseX;
    targetY = baseY;
    if (reduce.matches) model.rotation.set(baseX, baseY, -0.075);
    requestRender();
  };
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  const resizeObserver = new ResizeObserver(resize);
  const onLost = (event: Event) => {
    event.preventDefault();
    contextLost = true;
    delete host.dataset.ready;
    cancelAnimationFrame(frame);
    frame = 0;
  };
  const onRestored = () => {
    contextLost = false;
    requestRender();
  };
  visibility.observe(host);
  resizeObserver.observe(host);
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", reset);
  reduce.addEventListener("change", reset);
  pointer.addEventListener("change", reset);
  document.addEventListener("visibilitychange", requestRender);
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  resize();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    visibility.disconnect();
    resizeObserver.disconnect();
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", reset);
    reduce.removeEventListener("change", reset);
    pointer.removeEventListener("change", reset);
    document.removeEventListener("visibilitychange", requestRender);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    geometries.forEach((geometry) => geometry.dispose());
    face.dispose();
    metal.dispose();
    accentFace.dispose();
    environment.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    delete host.dataset.ready;
  };
}
