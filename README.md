# YouTube Ad Skipper Chrome Extension

A Chrome extension that automatically skips ads on YouTube videos.

## Features

- 🚀 **Auto-Skip**: Automatically clicks the "Skip Ad" button as soon as it appears
- ⚡ **Speed Up Ads**: Speeds up non-skippable ads to 16x playback speed
- 🔇 **Auto-Mute**: Mutes ads while they play
- 🎯 **Lightweight**: Minimal resource usage
- 🔄 **Always Active**: Works on all YouTube pages

## Installation

### Option 1: Load Unpacked Extension (Development Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top-right corner
3. Click "Load unpacked" button
4. Select the folder containing this extension (`chrome ext`)
5. The extension should now appear in your extensions list

### Option 2: Pack and Install

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Pack extension"
4. Select the extension root directory
5. Click "Pack Extension"
6. Install the generated `.crx` file

## Usage

Once installed, the extension works automatically:

1. Navigate to any YouTube video
2. When an ad plays, the extension will:
   - Automatically click the "Skip Ad" button when available
   - Speed up non-skippable ads to 16x speed
   - Mute the ad audio

No configuration or user interaction is required!

## How It Works

The extension uses a content script that:
- Monitors YouTube pages for ad elements
- Detects when the skip button becomes available
- Automatically clicks the skip button
- Speeds up ad playback and mutes audio for unskippable ads
- Restores normal playback when the ad ends

## Notes

- This extension only works on YouTube.com
- Some ads may still briefly appear before being skipped
- The extension respects YouTube's content delivery and simply automates the skip action
- YouTube's ad system may change over time; the extension may need updates to maintain compatibility

## Browser Compatibility

- Google Chrome (Manifest V3)
- Chromium-based browsers (Edge, Brave, Opera)

## Privacy

This extension:
- Does NOT collect any user data
- Does NOT track your browsing history
- Only runs on YouTube.com
- Works entirely locally on your device

## License

Free to use and modify.
