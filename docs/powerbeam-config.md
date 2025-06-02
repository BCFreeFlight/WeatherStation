# Configuring PowerBeam Antennas in Bridge Mode

Follow these steps to configure Ubiquiti PowerBeam antennas to communicate in bridge mode, enabling transparent network traffic between two or more locations.

## Prerequisites

- Two PowerBeam (or compatible) antennas
- Devices powered up and connected via Ethernet for initial configuration
- Access to the web interface for each unit
- Default login credentials (usually `ubnt`/`ubnt`, unless changed)

## Step 1: Initial Setup

1. Connect your computer to the PowerBeam’s PoE injector LAN port using an Ethernet cable.
2. Set your computer's network IP to a static address in the **192.168.1.x** range (e.g., 192.168.1.10).
3. Open a web browser and go to [http://192.168.1.20](http://192.168.1.20) (the default PowerBeam IP).

## Step 2: Login and Update Firmware

1. Log in (default username and password are usually `ubnt`).
2. If needed, update to the latest firmware from Ubiquiti’s [official site](https://www.ui.com/download/).

## Step 3: Configure the First PowerBeam (Access Point)

1. On the main menu, go to **Wireless**:
    - Set *Wireless Mode* to **Access Point**.
    - Enter a *SSID* (network name) that both antennas will use.
    - Choose your *Channel Width* and *Frequency* (try automatic or select manually for best performance).
    - Set/encrypt with a strong WPA2 password.
2. Go to **Network**:
    - Set *Network Mode* to **Bridge**.
    - Assign a static IP if desired (to avoid IP conflicts later).
3. Apply changes and reboot if prompted.

## Step 4: Configure the Second PowerBeam (Station/Client)

1. Connect to the second antenna and log in as above.
2. Go to **Wireless**:
    - Set *Wireless Mode* to **Station**.
    - Enter the *SSID* to match the Access Point.
    - Set Channel Width and Frequency to match the AP.
    - Enter the same WPA2 password.
3. Go to **Network**:
    - Set *Network Mode* to **Bridge**.
    - Assign a different static IP, or use DHCP if your network supports it.
4. Apply changes and reboot if prompted.

## Step 5: Align Antennas and Test Connection

1. Physically position and align the antennas with each other for optimal signal (use the tools in the web interface for alignment).
2. Connect your main network to the AP side and remote device/network to the Station side.
3. Test connectivity – devices at each end should be able to communicate seamlessly as if they are on the same LAN.

---

**Tips:**
- Use [UISP](https://play.google.com/store/apps/details?id=com.ubnt.uisp) (Android) or [UISP](https://apps.apple.com/app/uisp/id1392412432) (iOS) app for discovery and management.
- Use surge protectors to safeguard hardware outdoors.
- Adjust frequencies to minimize interference, especially in environments with other wireless networks.

For advanced settings and troubleshooting, consult your model's user manual or visit the [Ubiquiti Community Forums](https://community.ui.com/).
