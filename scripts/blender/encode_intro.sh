#!/bin/sh
# Pack the transparent intro frames into H.264 files the page can play everywhere.
# Left half: colour premultiplied by alpha. Right half: the alpha matte as grey.
# Side by side keeps 960 frames at 1920 x 1056, inside every phone's H.264 decoder.
# IntroRibbon recombines both halves in WebGL.
#
#   sh scripts/blender/encode_intro.sh [frames dir] [output dir]
set -eu

frames=${1:-design/intro/frames}
output=${2:-public/intro}
mkdir -p "$output"

for width in 960 640; do
  height=$((width * 11 / 10))
  ffmpeg -y -loglevel error -framerate 30 -i "$frames/%03d.png" -filter_complex "
    [0]format=rgba,premultiply=inplace=1,scale=$width:$height:flags=lanczos,format=rgba,split[c][a];
    [c]format=rgb24[colour];
    [a]alphaextract,format=gray,format=rgb24[matte];
    [colour][matte]hstack,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset veryslow -crf 19 -tune film -profile:v high -level 4.0 \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -movflags +faststart -an "$output/ribbon-$width.mp4"
  echo "$output/ribbon-$width.mp4: $(du -k "$output/ribbon-$width.mp4" | cut -f1) KiB"
done
