# Weather Station Setup Project

## Overview

This project provides detailed documentation for setting up a remote weather station with camera monitoring capabilities. The system is designed to connect to a WiFi network and stream both real-time weather data and a live video feed of launch activities for paragliding or other flight activities.

To view the results: Please visit [https://bcfreeflight.com/sites/coopers](https://bcfreeflight.com/sites/coopers)

## Documentation

### Hardware
- [Complete Parts List](docs/parts-list.md) - Comprehensive list of all required components with specifications
- [Wiring Diagram](docs/wiring-diagram.md) - Visual guide for connecting all system components

### Software & Configuration
- [Software Requirements](docs/software.md) - Essential applications and tools needed for all platforms
- [OBS Configuration](docs/obs-config.md) - Setting up Open Broadcaster Software for live streaming
- [Weather Station Configuration](docs/weather-station-config.md) - ECOWITT weather station setup and data integration
- [PowerBeam Configuration](docs/powerbeam-config.md) - Configuring Ubiquiti PowerBeam antennas in bridge mode
- [Reolink Camera Configuration](docs/reolink-config.md) - Setting up and integrating Reolink cameras

## Adding Your Weather Station to BCFreeFlight.com

To get your weather station added to [BCFreeFlight.com](https://bcfreeflight.com), follow these simple steps:

1. Set up your weather station to send data to Weather Underground
2. Submit an issue to [bcfreeflight.github.io](https://github.com/BCFreeFlight/bcfreeflight.github.io/issues/new) with the following information:
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
- Weather monitoring sensors with WiFi connectivity
- IP camera for visual monitoring
- Long-range wireless bridge for data transmission
- OBS configuration for live streaming

## Support

For questions or assistance with this setup, please contact the project maintainers or refer to the individual component documentation for troubleshooting.

---

*Last updated: June 2, 2025*
