#!/bin/bash

CONFIG_FILE="stream-to-youtube.yml"

# Load values from YAML
STREAM_URL=$(yq e '.stream_url' "$CONFIG_FILE")
YOUTUBE_KEY=$(yq e '.youtube_key' "$CONFIG_FILE")
RESTART_SECONDS=$(yq e '.restart_seconds' "$CONFIG_FILE")
AUDIO_ENABLED=$(yq e '.audio_enabled' "$CONFIG_FILE")
BITRATE=$(yq e '.bitrate' "$CONFIG_FILE")
RESOLUTION=$(yq e '.resolution' "$CONFIG_FILE")

DURATION=28800 # 8 hours
YOUTUBE_URL="rtmp://a.rtmp.youtube.com/live2/${YOUTUBE_KEY}"

mkdir -p logs
LOGFILE="logs/stream-to-youtube-$(date +%Y%m%d-%H%M%S).log"

log() {
  echo -e "$(date '+%Y-%m-%d %H:%M:%S')\t$1" >> "$LOGFILE"
}

# Determine audio args
if [[ "$AUDIO_ENABLED" == "true" ]]; then
  AUDIO_ARGS="-c:a aac -b:a 128k"
else
  AUDIO_ARGS="-an"
fi

# Startup metadata
log "▶️ Starting IP camera YouTube stream loop"
log "📺 Stream URL     : $STREAM_URL"
log "🔑 YouTube Key    : $YOUTUBE_KEY"
log "📶 Bitrate        : $BITRATE"
log "📏 Resolution     : $RESOLUTION"
log "🔊 Audio Enabled  : $AUDIO_ENABLED"
log "⚠️ Transcoding H.265 to H.264 (required for YouTube)"

while true; do
  log "──────────────────────────────────────────────"
  log "🚀 Launching FFmpeg stream"

  ffmpeg -rtsp_transport tcp -i "$STREAM_URL" \
    -s "$RESOLUTION" \
    -c:v libx264 -preset ultrafast -b:v "$BITRATE" -maxrate "$BITRATE" -bufsize "$BITRATE" \
    $AUDIO_ARGS \
    -f flv "$YOUTUBE_URL" -t "$DURATION" >> "$LOGFILE" 2>&1

  EXIT_CODE=$?

  if [[ $EXIT_CODE -eq 0 ]]; then
    log "✅ Stream ended normally (exit code 0). Restarting immediately..."
  else
    log "❌ Stream exited with error (exit code $EXIT_CODE). Waiting $RESTART_SECONDS seconds before retry..."
    sleep "$RESTART_SECONDS"
  fi
done