# ECOWITT Weather Station: Feeding Data to Weather Underground

Follow these steps to set up your ECOWITT weather station and send live weather data to Weather Underground.

## Two Stations in This System

This installation uses **two ECOWITT GW1101 stations**:

| Station | Location | Purpose |
|---------|----------|---------|
| Launch | Launch site, alongside the camera and network gear | Primary launch conditions |
| LZ | Landing zone | Landing conditions, and the second data point used to compute the atmospheric lapse rate between the two elevations |

Each station is a fully independent unit. Repeat every step below **once per station** — each one gets its own Weather Underground device registration, its own Station ID and Station Key, and its own entry in the WSView Plus app. Do not share a Station ID between the two units; doing so will interleave readings from different elevations into a single feed.

Record the elevation of each station when you register it. The lapse rate calculation depends on both elevations being accurate.

## 1. Register Your Station on Weather Underground

1. Visit [Weather Underground's registration page](https://www.wunderground.com/member/devices).
2. Log in or create an account if you do not have one.
3. Click **Add a New Device**.
4. Complete the required information, including your location, elevation, and station details.
5. After registration, note your **Station ID** and **Station Key**/Password.
6. Repeat for the second station, using its own name, location, and elevation.

## 2. Connect Your ECOWITT Console to Wi-Fi

1. Plug in your ECOWITT weather station and turn it on.
2. On the console, navigate to the network settings to enable Wi-Fi.
3. Connect your phone to the same Wi-Fi network you want your station to use.

## 3. Use the WSView Plus App

1. Download and install the [WSView Plus app](https://play.google.com/store/apps/details?id=com.fineoffset.wsplus) (Android) or [WSView Plus app](https://apps.apple.com/app/wsview-plus/id1473910294) (iOS).
2. Open the app and search for the weather station device.
3. Follow the app’s instructions to connect the station to your Wi-Fi.

## 4. Configure Weather Underground Uploads

1. Within the WSView Plus app, select your weather station device.
2. Go to **Device Settings** > **Weather Services** or **Upload Settings**.
3. Select **Weather Underground**.
4. Enter the **Station ID** and **Station Key** belonging to *that* station (from step 1).
5. Save the settings.
6. Repeat for the second station, taking care to enter the matching credentials.

## 5. Confirm Data Upload

- Return to Weather Underground's [Device Management](https://www.wunderground.com/member/devices).
- Both stations should show as "Online" after a few minutes. Data updates typically start within 10–15 minutes.
- If data does not appear, double-check the Station ID, Key, and network connection.
- If one station reports the other's conditions, the Station IDs have been swapped between the two units — correct them in WSView Plus.

---

*Note: For troubleshooting, consult the ECOWITT user manual or the WSView Plus app help section.*
