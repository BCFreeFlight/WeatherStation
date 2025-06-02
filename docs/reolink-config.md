# Reolink Camera Documentation

This guide provides instructions for setting up your Reolink IP PoE camera and configuring it to stream video into OBS (Open Broadcaster Software) using both the RTSP and RTMP protocols.

## 1. Camera Hardware & Initial Setup

1. **Mount the Camera:** Install the camera at your desired location using the provided hardware.
2. **Connect Power & Network:** Use a PoE (Power over Ethernet) adapter or switch to provide both power and network connectivity with a single Ethernet cable.
3. **Find the Camera on Your Network:** Use the Reolink app (Windows/Mac/mobile) or your router’s client list to note the camera’s IP address.

## 2. Accessing the Camera Web Interface

1. Open a web browser.
2. Enter `http://<IP address>` (replace `<IP address>` with your camera’s assigned address).
3. Log in using your camera credentials (set up initially via the Reolink app or web interface).

## 3. Stream URLs for OBS

### A. RTSP Stream

RTSP is a common protocol for streaming high-quality video with minimal latency. OBS can ingest RTSP directly.

#### RTSP URL Format

```
rtsp://<username>:<password>@<IP address>/Preview_<channel number>_<stream type>
```


**Parameters:**
- `<username>`: Your camera login username
- `<password>`: Your camera login password
- `<IP address>`: Your camera's local IP address (e.g., 192.168.1.101)
- `<channel number>`: Typically `0` for most single-channel cameras
- `<stream type>`: `main` for high quality, `sub` for lower quality/bitrate stream

#### Example

Suppose your info is:
- Username: `admin`
- Password: `MySecret123`
- IP address: `192.168.1.101`
- Using main stream (high quality)

Your RTSP URL would be:
```
rtsp://admin:MySecret123@192.168.1.101/Preview_0_main
```


### B. RTMP Stream

RTMP is typically used for pushing streams to servers (YouTube, Twitch) but Reolink cameras also allow RTMP URLs which can be pulled into OBS.

#### RTMP URL Format

```
rtmp://<IP address>/bcs/channel<channel id>_main.bcs?channel=<channel id>&stream=0&user=<username>&password=<password>
```


**Parameters:**
- `<IP address>`: Your camera's IP address
- `<channel id>`: Usually `0` (unless you have multiple channels)
- `<username>`: Camera login username
- `<password>`: Camera login password

#### Example

Suppose:
- Username: `admin`
- Password: `MySecret123`
- IP address: `192.168.1.101`
- Channel: `0`

Your RTMP URL would be:
```
rtmp://192.168.1.101/bcs/channel0_main.bcs?channel=0&stream=0&user=admin&password=MySecret123
```

## 5. Troubleshooting Tips

- **Firewall Issues:** Ensure that port 554 (for RTSP) and port 1935 (for RTMP) are allowed through your network firewall if necessary.
- **Multiple Cameras:** Repeat the above steps for each camera, adjusting the channel number if you have multiple channels/cameras.
- **Network Stability:** A wired connection (Ethernet) is recommended for best reliability.

## 6. Additional Resources

- [Reolink Official RTSP/RTMP Documentation](https://support.reolink.com)
---

**Note:** Replace the placeholders (`<username>`, `<password>`, `<IP address>`, `<channel number>`, etc.) in the URLs with your actual camera credentials and configuration.

If you need further assistance, please consult your camera’s user manual or contact Reolink support.