
# 📡 IP Camera to YouTube Streaming Setup

This guide walks you through setting up a computer to stream an IP camera to YouTube **automatically**, using minimal CPU and restarting reliably. Once installed, the stream will run 24/7 and automatically recover after crashes or reboots.

---

## ✅ What This Setup Does

- Streams your IP camera feed to YouTube Live
- Automatically restarts the stream every 8 hours
- Restarts on crash or network failure (with delay)
- Logs everything to easy-to-read files
- Deletes old logs after 15 days
- Starts automatically when the computer boots up

---

## 🧰 Requirements

- A Linux computer (Linux Mint or Ubuntu recommended)
- A working internet connection
- An RTSP-capable IP camera (like Reolink, Hikvision, etc.)
- A YouTube stream key (from YouTube Live Dashboard)

---

## ⚙️ 1. Clone or Download the Project Files

Open a terminal and download or clone the folder containing:

- `stream-to-youtube.sh`
- `stream-to-youtube.yml`
- `init-stream-setup.sh`

Place all these files in a folder, e.g., `~/camera-streamer`.

---

## 🛠️ 2. Edit the Configuration File

Open the file `stream-to-youtube.yml` in a text editor:

```yaml
stream_url: "rtsp://admin:YourPassword@192.168.0.194/Preview_01_main"
youtube_key: "YOUR_YOUTUBE_STREAM_KEY"
restart_seconds: 60
audio_enabled: false
bitrate: "2500k"
resolution: "1280x720"
log_retention_days: 15
```

### 📌 Notes:
- Replace the `stream_url` with your IP camera's RTSP link.
- Replace `youtube_key` with your stream key from [YouTube Live Control Room](https://www.youtube.com/live_dashboard).
- Leave the other values unless you know what to change.

---

## 🚀 3. Run the Setup Script

In the terminal, make the installer script executable:

```bash
chmod +x init-stream-setup.sh
```

Then run the installer:

```bash
./init-stream-setup.sh
```

### ✅ This will:
- Install required software (`ffmpeg` and `yq`)
- Set permissions
- Create a system service to auto-run the stream
- Enable auto-start at boot
- Start the stream immediately

---

## 📂 4. Logs and Monitoring

- All logs are saved to the `logs/` folder
- To view live logs:
  ```bash
  journalctl -u youtube-stream -f
  ```

- The most recent **error status** (if any) is saved in:
  ```
  logs/status.log
  ```

- Old logs older than 15 days are automatically deleted.

---

## 🔄 5. What Happens Behind the Scenes

- The stream runs for 8 hours, then restarts.
- If it crashes, it waits 60 seconds, then retries.
- If it ends normally, it restarts immediately.
- It auto-starts when the computer reboots.

---

## 🧽 6. (Optional) Stop or Restart the Stream

To manually stop or start the service:

```bash
sudo systemctl stop youtube-stream
sudo systemctl start youtube-stream
```

To check status:

```bash
sudo systemctl status youtube-stream
```

To disable auto-start:

```bash
sudo systemctl disable youtube-stream
```

---

## 🧠 FAQ

**Q: I don't see video on YouTube Live.**
- Make sure your stream key is correct.
- Check that your camera is accessible from this computer.
- Check logs in `logs/` or run:  
  ```bash
  journalctl -u youtube-stream -f
  ```

**Q: The stream stops randomly.**
- This is expected every 8 hours. It auto-restarts.
- If it crashes, check `logs/status.log` for the latest error.

---

## 💬 Need Help?

If you're stuck, share your `logs/status.log` file and a few lines from your latest `logs/stream-to-youtube-*.log` with someone technical. They'll know what to look for!

---

Enjoy effortless 24/7 streaming. ☁️📹🔥
