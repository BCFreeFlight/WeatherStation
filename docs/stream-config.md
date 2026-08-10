# Live Streaming with the Stream Script

Live streaming to YouTube is handled by [BC Free Flight Stream](https://github.com/BCFreeFlight/Stream) — a self-contained Python script written for this project. It proxies the RTSP camera feed to YouTube Live via `ffmpeg`, manages the YouTube broadcast lifecycle, handles OAuth 2.0 authentication, retries automatically on failure, and registers its own cron jobs for unattended operation.

The broadcast URL is **stable**: once created during `--install`, the same YouTube URL is reused every time the stream starts and stops, so it is safe to embed in a webpage.

## Requirements

- Linux Mint / Ubuntu-based system (the Mele mini PC at the site)
- Python 3.8 or later
- `ffmpeg` (installed automatically by `--install`)
- A Google Cloud project with the **YouTube Data API v3** enabled
- An RTSP-capable camera reachable from the host — see [Reolink Camera Configuration](reolink-config.md)

All Python dependencies are self-installed by the script on first run.

## 1. Google Cloud Setup

Do this before running the installer.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project, or select an existing one.
3. Navigate to **APIs & Services > Library**.
4. Search for **YouTube Data API v3** and click **Enable**.
5. Navigate to **APIs & Services > Credentials**.
6. Click **Create Credentials > OAuth client ID**.
7. Select **Desktop app** as the application type.
8. Copy the **Client ID** and **Client Secret** — both are needed during `--install`.

> **Note:** You do *not* need to copy a stream key out of YouTube Studio. The installer creates the broadcast and live-stream resources through the API and writes the stream URL and key into `config.toml` automatically.

## 2. Install

On the streaming machine, `cd` to the directory where the script should live and run:

```bash
curl -fLO https://github.com/BCFreeFlight/Stream/releases/latest/download/stream.py && python3 stream.py --install
```

The interactive wizard will:

- Prompt for Google OAuth credentials, the RTSP URL, broadcast title/privacy/category, and the cron schedule
- Install `ffmpeg` and the required Python packages
- Open a browser for Google OAuth 2.0 authorization
- Create the YouTube broadcast and live-stream resources
- Write `config.toml` and `.env` beside the script
- Detect the terminal emulator and register cron jobs
- Print the stable YouTube URL for the stream

Re-running `--install` is idempotent. It loads existing configuration and only prompts for values that are missing, preserving credentials, YouTube resources, and cron entries.

## 3. Commands

| Command | Purpose |
|---------|---------|
| `python3 stream.py --start` | Create a fresh broadcast and start streaming |
| `python3 stream.py --stop` | Stop `ffmpeg` gracefully and archive the broadcast as a VOD |
| `python3 stream.py --recover` | Resume streaming if the current time is inside the daily window (used at boot) |
| `python3 stream.py --install` | Run or re-run the setup wizard |
| `python3 stream.py --update` | Back up and upgrade to the latest release |
| `python3 stream.py --roll-back [version]` | Restore a previous version from `backup/` |
| `python3 stream.py --reinstall` | Clean-slate: uninstall, delete config, re-install |
| `python3 stream.py --uninstall` | Stop the stream, archive the broadcast, remove cron entries |
| `python3 stream.py --set-property <key> <value>` | Set a `config.toml` value from the command line |
| `python3 stream.py --start --log-level debug` | Override log verbosity for a single run |

## 4. Scheduling

`--install` registers three cron entries by default, scheduled for the April–October flying season, plus an optional fourth:

| Job | Default schedule | Behaviour |
|-----|------------------|-----------|
| Start | `30 6 1-31 4-10 *` (6:30 AM) | Opens a terminal window and starts streaming |
| Stop | `25 18 1-31 4-10 *` (6:25 PM) | Runs headless to stop the stream |
| Recover | `@reboot` | Runs `--recover`; resumes the stream if the machine reboots inside the window |
| Update *(optional)* | `0 0 * * *` (midnight) | Runs `--update`; only registered when `cron.autoUpdate = true` |

Auto-update is disabled by default so the site is never updated unattended without consent. The start job opens a single terminal window titled "BC Free Flight Stream", which closes when the stop job fires.

## 5. Configuration

Non-secret configuration lives in `config.toml` beside the script. Frequently adjusted keys:

| Key | Default | Description |
|-----|---------|-------------|
| `stream.rtspUrl` | *(prompted)* | Full RTSP URL of the camera |
| `stream.mute` | `false` | If `true`, audio is stripped |
| `youtube.broadcastTitle` | `My Location: {date}` | Title template; `{date}` resolves to the current ISO date |
| `youtube.privacy` | `public` | `public`, `unlisted`, or `private` |
| `youtube.embeddable` | `true` | Allow the broadcast to be embedded on external sites |
| `youtube.enableDvr` | `false` | Allow viewers to rewind the live stream |
| `youtube.archivePrivacy` | `private` | Privacy applied to the archived video after `--stop` |
| `logLevel` | `info` | `debug`, `info`, `warning`, or `error` |
| `logRetentionDays` | `15` | Days of logs to keep |
| `cron.start` / `cron.stop` | see above | Daily start and stop schedules |
| `cron.autoUpdate` | `false` | Register the automatic update job |

Secrets live in `.env` (`GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_ACCESS_TOKEN`). **Never share or commit this file.**

See the [full configuration reference](https://github.com/BCFreeFlight/Stream#configuration-reference) for every key.

## 6. Logs

- Location: `logs/` beside the script, one file per day
- Format: `[ISO-8601-timestamp] [LEVEL] message`
- Old files are pruned on each `--start` according to `logRetentionDays`
- At the default `info` level `ffmpeg` progress noise is hidden; use `--log-level debug` to see it

## 7. Troubleshooting

Run any command with `--log-level debug` for full detail.

**Stream never goes live / status stuck `inactive`**
- Verify the camera URL and that the host can reach it; check the `[ffmpeg]` debug lines.
- If the camera password changed, re-run `--install` — special characters are encoded automatically.
- A stream key mismatch is repaired by re-running `--install`.

**"Playback on other websites has been disabled" (embed blocked)**
- Ensure `youtube.embeddable = true` and run `--start` again.

**OAuth fails or authorizes the wrong account**
- The flow always shows the account chooser — pick the correct account.
- To switch accounts permanently, use `--reinstall`.

**Stream didn't resume after a reboot**
- `--recover` only acts inside the `cron.start`/`cron.stop` window.
- Confirm the entry exists: `crontab -l | grep bcfreeflight_stream`.
- Re-run `--install` to repair cron entries.

**No terminal window opens**
- The detected terminal may be wrong: `python3 stream.py --set-property terminal xterm`.

**`pip install` fails (externally-managed environment)**
- PEP 668 systems fall back to `--user --break-system-packages` automatically. If it still fails, pre-install the dependencies or run inside a virtualenv.

For anything not covered here, see the [Stream troubleshooting guide](https://github.com/BCFreeFlight/Stream/blob/main/docs/troubleshooting.md).
