# YouTube Ad Skipper Chrome Extension

A powerful Chrome extension that automatically skips ads on YouTube videos and provides custom playback speed controls.

## ✨ Features

- 🚀 **Auto-Skip Ads**: Automatically clicks the "Skip Ad" button as soon as it appears
- ⚡ **Speed Up Ads**: Speeds up non-skippable ads to 16x playback speed
- 🔇 **Auto-Mute Ads**: Mutes ads while they play
- 🎮 **Custom Speed Control**: Add a speed control button directly to YouTube player
- 🎯 **Lightweight**: Minimal resource usage
- 🔄 **Always Active**: Works on all YouTube pages and videos

## 🎮 Speed Control

The extension adds a custom speed button to the YouTube player controls:

- **Left Click**: Cycle through speeds (0.25x → 0.5x → 0.75x → 1x → 1.25x → 1.5x → 1.75x → 2x → 2.5x → 3x → 4x)
- **Right Click**: Go backwards through speeds
- **Visual Feedback**: Shows current speed on the button and displays a notification when changed
- **Smart Memory**: Preserves your chosen speed even when ads play

## 📦 Installation

### Option 1: Load Unpacked Extension (Development Mode)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **"Developer mode"** by toggling the switch in the top-right corner
3. Click **"Load unpacked"** button
4. Select the folder containing this extension
5. The extension should now appear in your extensions list

### Option 2: Pack and Install

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **"Developer mode"**
3. Click **"Pack extension"**
4. Select the extension root directory
5. Click **"Pack Extension"**
6. Install the generated `.crx` file

## 🚀 Usage

Once installed, the extension works automatically:

1. Navigate to any YouTube video
2. When an ad plays, the extension will:
   - Automatically click the "Skip Ad" button when available
   - Speed up non-skippable ads to 16x speed and mute them
   - Restore your preferred playback speed after the ad ends

3. Use the speed control button in the player:
   - Click to increase speed
   - Right-click to decrease speed
   - Your speed preference is saved even during ads

No configuration or additional setup required!

## 🔧 How It Works

The extension uses a content script that:
- Monitors YouTube pages for ad elements using multiple detection methods
- Detects when the skip button becomes available
- Automatically clicks the skip button
- Speeds up ad playback to 16x and mutes audio for unskippable ads
- Adds a custom speed control button to the YouTube player
- Restores normal playback speed after ads end
- Preserves user's preferred playback speed across ads

## 📋 Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: `activeTab` only
- **Content Script**: Runs on `*.youtube.com/*`
- **No Background Service**: Lightweight and efficient

## 🌐 Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Chromium-based browsers (Microsoft Edge, Brave, Opera, Vivaldi)

## 🔒 Privacy

This extension:
- ❌ Does NOT collect any user data
- ❌ Does NOT track your browsing history
- ❌ Does NOT send data to external servers
- ✅ Only runs on YouTube.com
- ✅ Works entirely locally on your device
- ✅ Open source - you can review all the code

## 📝 Notes

- Some ads may still briefly appear before being skipped (usually <1 second)
- The extension respects YouTube's content delivery and simply automates the skip action
- YouTube's ad system may change over time; the extension may need updates to maintain compatibility
- Speed controls work independently from YouTube's native speed settings

## 🐛 Troubleshooting

**Extension not working?**
1. Make sure the extension is enabled in `chrome://extensions/`
2. Refresh the YouTube page after installing/updating the extension
3. Check the browser console (F12) for any error messages

**Speed button not appearing?**
1. Wait a few seconds for the YouTube player to fully load
2. Refresh the page
3. Check if the button is hidden behind other elements

**Ads not being skipped?**
1. YouTube may have updated their ad system
2. Check for extension updates
3. Report the issue with details about the ad type

## 🤝 Contributing

Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

Free to use and modify for personal use.

## ⚠️ Disclaimer

This extension is for educational purposes. Use responsibly and in accordance with YouTube's Terms of Service.

---

**Made with ❤️ for a better YouTube experience**
