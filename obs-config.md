# Configuring OBS Studio with Reolink Cameras for YouTube Streaming

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up Your YouTube Account](#setting-up-your-youtube-account)
3. [Configuring Your Reolink Camera](#configuring-your-reolink-camera)
4. [Setting Up OBS Studio](#setting-up-obs-studio)
5. [Going Live on YouTube](#going-live-on-youtube)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

- A Reolink camera (with RTSP support)
- OBS Studio installed on your computer
- Stable internet connection (upload speed of at least 5 Mbps recommended)
- YouTube account
- Computer with sufficient processing power

## Setting Up Your YouTube Account

### Creating a YouTube Channel

1. Sign in to YouTube with your Google account
2. Click on your profile picture in the top right corner
3. Select "Create a channel"
4. Follow the prompts to set up your channel

### Enabling Live Streaming

**WARNING:** **YouTube requires account verification and has a 24-hour waiting period before you can live stream. Complete this step at least 24 hours before your planned stream!**

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. In the left sidebar, click on "Settings"
3. Select "Channel" > "Feature eligibility"
4. Under "Live streaming", click "Verify" if your account is not yet verified
5. Complete the verification process (you'll need your phone for this)
6. After verification, you may need to wait up to 24 hours before live streaming is enabled

### Creating a Stream Key

1. In YouTube Studio, click on "Create" in the top right corner
2. Select "Go live"
3. Choose "Stream" from the options
4. Fill in your stream details (title, description, visibility, etc.)
5. Under "Stream settings", you'll find your stream key
6. Copy this key (you'll need it for OBS)

## Configuring Your Reolink Camera

### Accessing Camera Settings

1. Open the Reolink app on your mobile device or access the camera's web interface
2. Log in with your credentials
3. Navigate to camera settings

### Enabling RTSP Stream

1. Go to "Network Settings" > "Advanced"
2. Ensure RTSP is enabled
3. Note the RTSP URL for your camera. It typically follows this format:
   ```
   rtsp://username:password@camera_ip:554/h264Preview_01_main
   ```
   - Replace `username` and `password` with your camera credentials
   - Replace `camera_ip` with your camera's IP address

### Optional: Optimizing Camera Settings

1. Set video quality to the desired resolution (1080p recommended for streaming)
2. Adjust frame rate (higher frame rates provide smoother video but require more bandwidth)
3. Configure exposure settings for optimal visibility

## Setting Up OBS Studio

### Basic Configuration

1. Open OBS Studio
2. Go to "Settings" > "Stream"
3. Select "YouTube - RTMPS" as the service
4. Paste your YouTube stream key
5. Click "Apply" and then "OK"

### Adding Your Reolink Camera as a Source

1. In the main OBS interface, under "Sources", click the "+" button
2. Select "Media Source"
3. Name it something recognizable (e.g., "Reolink Camera")
4. Check "Local File" and uncheck it immediately (this is a workaround for some OBS versions)
5. In the "Input" field, paste your Reolink camera's RTSP URL
6. Under "Network Buffering", set a value between 1-4 ms (start with 2)
7. Check "Restart playback when source becomes active"
8. Check "Hardware Decoder" if your computer supports it
9. Click "OK"

### Optimizing OBS Settings

1. Go to "Settings" > "Output"
2. Select "Advanced" output mode
3. Under the "Streaming" tab:
   - Set "Encoder" to "x264" (or hardware encoder if available)
   - Set "Rate Control" to "CBR"
   - Set "Bitrate" between 3000-6000 Kbps (depending on your internet speed)
   - Set "Keyframe Interval" to 2
   - Set "CPU Usage Preset" to "veryfast" or "faster"
   - Set "Profile" to "main"
   - Set "Tune" to "zerolatency"
4. Under "Audio", set "Audio Bitrate" to 128 or 160
5. Go to "Settings" > "Video"
   - Set "Output Resolution" to match your desired stream quality (1080p recommended)
   - Set "FPS" to 30 (or 60 if your setup can handle it)

## Going Live on YouTube

1. In OBS, click "Start Streaming"
2. Go to YouTube Studio in your browser
3. Click "Create" > "Go Live"
4. Verify your stream settings
5. When your stream preview appears, click "Go Live"

## Troubleshooting

### Camera Feed Not Showing

- Verify the RTSP URL is correct
- Ensure the camera is online and connected to the network
- Check username and password in the RTSP URL
- Try increasing the network buffer in the Media Source settings

### Streaming Issues

- Check your internet connection speed
- Lower your streaming bitrate if experiencing buffering
- Ensure your CPU usage is not too high (consider lowering resolution or frame rate)
- Verify your stream key is correct and hasn't expired

### Delay or Latency

- Some delay (15-30 seconds) is normal for YouTube streams
- To minimize delay, use the "Low-latency" option in YouTube's stream settings
- In OBS, set "Tune" to "zerolatency" in output settings

### Video Quality Issues

- Increase bitrate (if your internet connection allows)
- Adjust camera settings for better lighting and clarity
- Use a slower encoder preset if your CPU can handle it

---

For additional help, refer to:
- [OBS Studio Documentation](https://obsproject.com/wiki/)
- [YouTube Creator Academy](https://creatoracademy.youtube.com/)
- [Reolink Support](https://support.reolink.com/)