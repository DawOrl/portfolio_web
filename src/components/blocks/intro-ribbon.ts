/**
 * Plays the Blender intro film (scripts/blender/intro_sequence.py) with transparency.
 * Each H.264 frame holds premultiplied colour on the left and its alpha matte on
 * the right; WebGL recombines the halves, so the ribbon keeps its alpha everywhere.
 */

/** Intro frames are framed this much wider than the hero still. */
export const RIBBON_PAD = 1.3;
/** Width / height of one frame and of /hero-form-blender.webp. */
export const RIBBON_ASPECT = 10 / 11;
export const RIBBON_FRAMES = 72;
export const RIBBON_FPS = 30;

const VERTEX = `
attribute vec2 position;
varying vec2 uv;
void main() {
  uv = vec2(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5);
  gl_Position = vec4(position, 0.0, 1.0);
}`;

// mediump (fp16 on phones) is too coarse to keep both halves on the same texel.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D film;
varying vec2 uv;
void main() {
  vec3 colour = texture2D(film, vec2(uv.x * 0.5, uv.y)).rgb;
  float alpha = texture2D(film, vec2(0.5 + uv.x * 0.5, uv.y)).r;
  // Compression noise must not push premultiplied colour above its alpha.
  gl_FragColor = vec4(min(colour, vec3(alpha)), alpha);
}`;

export type RibbonFilm = {
  /** Resolves once the whole file is local. */
  ready: Promise<void>;
  play: () => Promise<void>;
  destroy: () => void;
};

// The file is fetched whole, so a replay starts instantly and mobile Safari,
// which ignores preload, still has every frame before playback begins.
const downloads = new Map<string, Promise<string>>();

function download(src: string) {
  let pending = downloads.get(src);
  if (!pending) {
    pending = fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`Intro film: ${response.status}`);
        return response.blob();
      })
      .then((blob) => URL.createObjectURL(blob));
    pending.catch(() => downloads.delete(src));
    downloads.set(src, pending);
  }
  return pending;
}

// One context per canvas: getContext returns the same one on every replay.
const contexts = new WeakMap<HTMLCanvasElement, WebGLRenderingContext>();

function prepare(canvas: HTMLCanvasElement) {
  const ready = contexts.get(canvas);
  if (ready && !ready.isContextLost()) return ready;
  const gl = canvas.getContext("webgl", {
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
  });
  if (!gl || gl.isContextLost())
    throw new Error("Intro film: WebGL unavailable");

  const shader = (type: number, source: string) => {
    const result = gl.createShader(type)!;
    gl.shaderSource(result, source);
    gl.compileShader(result);
    return result;
  };
  const linked = gl.createProgram()!;
  gl.attachShader(linked, shader(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(linked, shader(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(linked);
  if (!gl.getProgramParameter(linked, gl.LINK_STATUS))
    throw new Error("Intro film: shader link failed");
  gl.useProgram(linked);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(linked, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  contexts.set(canvas, gl);
  return gl;
}

export function createRibbonFilm(
  canvas: HTMLCanvasElement,
  width: 960 | 640,
): RibbonFilm {
  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  let gl: WebGLRenderingContext | null = null;
  let stopped = false;
  let pending = 0;
  let drawn = -1;

  // Plain animation frames work for a detached video in every engine. Uploading
  // every half film frame catches a late decoder without a texture per 120 Hz tick.
  const loop = () => {
    if (stopped) return;
    const frame = Math.floor(video.currentTime * RIBBON_FPS * 2);
    if (gl && video.readyState >= 2 && frame !== drawn) {
      drawn = frame;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    if (!video.ended) pending = requestAnimationFrame(loop);
  };

  const ready = (async () => {
    gl = prepare(canvas);
    // A replay must not flash the previous run's last frame.
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const url = await download(`/intro/ribbon-${width}.mp4`);
    if (stopped) throw new Error("Intro film: stopped");
    // No wait for metadata: Low Power Mode may never load it before play(),
    // and a rejected play() should reach the still form at once.
    video.src = url;
    canvas.width = width;
    canvas.height = Math.round(width / RIBBON_ASPECT);
    gl.viewport(0, 0, canvas.width, canvas.height);
  })();
  ready.catch(() => {});

  return {
    ready,
    play: async () => {
      await video.play();
      loop();
    },
    destroy: () => {
      stopped = true;
      cancelAnimationFrame(pending);
      video.pause();
      video.removeAttribute("src");
      video.load();
      gl = null;
    },
  };
}
