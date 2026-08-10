# Weather Station Setup Project

## Overview

This project provides detailed documentation for setting up a remote weather station with camera monitoring capabilities. The system is designed to connect to a WiFi network and stream both real-time weather data and a live video feed of launch activities for paragliding or other flight activities.

The installation uses **two ECOWITT weather stations** — one at launch and one at the landing zone — which allows the atmospheric lapse rate between the two elevations to be computed.

To view the results: Please visit [https://bcfreeflight.com/sites/coopers](https://bcfreeflight.com/sites/coopers)

## Documentation

### Hardware
- [Complete Parts List](docs/parts-list.md) - Comprehensive list of all required components with specifications
- [Wiring Diagram](docs/wiring-diagram.md) - Visual guide for connecting all system components

### Software & Configuration
- [Software Requirements](docs/software.md) - Essential applications and tools needed for all platforms
- [Live Streaming with the Stream Script](docs/stream-config.md) - Installing, configuring, scheduling, and troubleshooting the streaming software
- [Weather Station Configuration](docs/weather-station-config.md) - ECOWITT weather station setup and data integration for both stations
- [PowerBeam Configuration](docs/powerbeam-config.md) - Configuring Ubiquiti PowerBeam antennas in bridge mode
- [Reolink Camera Configuration](docs/reolink-config.md) - Setting up and integrating Reolink cameras

### Printable Handbook

- [Weather Station Field Handbook (PDF)](docs/WeatherStation-Field-Handbook.pdf) - All of the above compiled into a printable book for on-site reference, with a blank credentials record at the back to fill in by hand

The handbook is generated from the markdown in this directory. The markdown files are the source of truth; after changing them, update [`docs/handbook/handbook.template.html`](docs/handbook/handbook.template.html) to match and run [`docs/handbook/build.sh`](docs/handbook/build.sh) to re-render the PDF.

## Live Streaming Setup

Live streaming to YouTube is handled by [Stream](https://github.com/BCFreeFlight/Stream), a self-contained Python script written for this project. On the streaming machine, run:

```bash
curl -fLO https://github.com/BCFreeFlight/Stream/releases/latest/download/stream.py && python3 stream.py --install
```

This launches an interactive wizard that installs `ffmpeg`, walks through Google OAuth setup, creates a stable YouTube broadcast URL, and registers cron jobs to start/stop the stream daily and recover it after a reboot. See [Live Streaming with the Stream Script](docs/stream-config.md) for the full walkthrough, or the [Stream README](https://github.com/BCFreeFlight/Stream) for the complete configuration reference.

## Adding Your Weather Station to BCFreeFlight.com

To get your weather station added to [BCFreeFlight.com](https://bcfreeflight.com), follow these simple steps:

1. Set up your weather station to send data to Weather Underground
2. Submit an issue to [bcfreeflight.github.io](https://github.com/BCFreeFlight/bcfreeflight.github.io/issues/new) with the following information (repeat per station if you have more than one):
   - Your Weather Underground Station ID
   - Your Weather Underground Station Key
   - Station name and location
   - Site elevation in meters
   - Brief description of the flying site
   - Contact information (optional)

The BCFreeFlight team will handle the integration and add your weather station data to the site once your submission is approved.

## System Architecture

The system consists of:
- Solar power generation and battery storage
- Two ECOWITT weather stations (launch and LZ) with WiFi connectivity
- IP camera for visual monitoring
- Long-range wireless bridge for data transmission
- [Stream](https://github.com/BCFreeFlight/Stream) script for live streaming to YouTube

## Support

For questions or assistance with this setup, refer to the individual component documentation for troubleshooting, or open an issue on this repository. For issues with the streaming software itself, open an issue on the [Stream](https://github.com/BCFreeFlight/Stream/issues) repository.

---

*Last updated: August 10, 2026*
