#!/bin/bash

# CONFIGURATION
SERVICE_NAME="youtube-stream"
SCRIPT_NAME="stream-to-youtube.sh"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
USER_NAME=$(whoami)
SCRIPT_PATH="$(pwd)/${SCRIPT_NAME}"
LOG_DIR="$(pwd)/logs"

echo "🔧 Setting up stream-to-YouTube service..."

# 1. Install dependencies
echo "📦 Installing ffmpeg and yq..."
sudo apt update
sudo apt install -y ffmpeg

# Install yq via snap if not found or version is outdated
if ! command -v yq &>/dev/null || ! yq --version | grep -q 'version 4'; then
    echo "📦 Installing yq via snap..."
    sudo snap install yq
fi

# 2. Ensure logs directory exists
echo "📁 Creating logs directory..."
mkdir -p "$LOG_DIR"

# 3. Set executable permissions on script
echo "🔐 Setting permissions on script..."
chmod +x "$SCRIPT_PATH"

# 4. Create systemd service file
echo "⚙️ Creating systemd service..."

sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=Stream IP Camera to YouTube
After=network.target

[Service]
ExecStart=${SCRIPT_PATH}
WorkingDirectory=$(pwd)
Restart=always
RestartSec=10
User=${USER_NAME}
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# 5. Enable and start the service
echo "🚀 Enabling and starting the stream service..."
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"

# 6. (Optional) Add daily cron job to clean up orphan logs (redundant if handled by script)
CRON_JOB="@daily find $LOG_DIR -type f -name 'stream-to-youtube-*.log' -mtime +30 -delete"
( crontab -l 2>/dev/null | grep -v "stream-to-youtube" ; echo "$CRON_JOB" ) | crontab -

echo "✅ Setup complete. Logs will appear in $LOG_DIR"
echo "▶️ Run \`journalctl -u $SERVICE_NAME -f\` to view service logs."