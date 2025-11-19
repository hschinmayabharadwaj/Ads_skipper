// YouTube Ad Skipper Content Script

console.log('YouTube Ad Skipper: Extension loaded');

// Available playback speeds
const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
let currentSpeedIndex = 3; // Default to 1x speed
let userSetSpeed = 1; // Track user's preferred speed

// Function to click the skip button
function clickSkipButton() {
  // Try multiple selectors as YouTube may change their class names
  const skipButtonSelectors = [
    '.ytp-ad-skip-button',
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button-modern',
    'button.ytp-ad-skip-button',
    '.ytp-ad-skip-button-container button',
    'button[class*="skip"]',
    '.videoAdUiSkipButton'
  ];

  for (const selector of skipButtonSelectors) {
    const skipButton = document.querySelector(selector);
    if (skipButton && skipButton.offsetParent !== null) { // Check if visible
      console.log('YouTube Ad Skipper: Skip button found, clicking...');
      skipButton.click();
      return true;
    }
  }
  return false;
}

// Track if we were in an ad state
let wasInAd = false;
let originalMuteState = false;

// Function to speed up ads
function speedUpAd() {
  const video = document.querySelector('video');
  if (!video) return;
  
  // Check if an ad is playing - use multiple detection methods
  const adIndicators = [
    '.ytp-ad-player-overlay',
    '.ytp-ad-text',
    '.ad-showing',
    '.video-ads',
    '.ytp-ad-module',
    '.ytp-ad-image-overlay',
    '.ytp-ad-player-overlay-instream-info'
  ];
  
  // Also check the video player for ad class
  const videoContainer = document.querySelector('.html5-video-player');
  const hasAdClass = videoContainer && videoContainer.classList.contains('ad-showing');
  
  // Check for ad text in the player
  const adTextElement = document.querySelector('.ytp-ad-text');
  
  const isAdPlaying = adIndicators.some(selector => 
    document.querySelector(selector) !== null
  ) || hasAdClass || adTextElement !== null;

  if (isAdPlaying) {
    // Entering ad state
    if (!wasInAd) {
      originalMuteState = video.muted;
      wasInAd = true;
      console.log('YouTube Ad Skipper: Ad detected, speeding up...');
    }
    
    // Speed up the ad to 16x (maximum)
    if (video.playbackRate !== 16) {
      video.playbackRate = 16;
    }
    
    // Mute the ad
    if (!video.muted) {
      video.muted = true;
    }
  } else {
    // Exiting ad state - reset everything
    if (wasInAd) {
      console.log('YouTube Ad Skipper: Ad finished, restoring normal playback');
      video.playbackRate = userSetSpeed; // Restore user's chosen speed
      video.muted = originalMuteState;
      wasInAd = false;
    } else if (video.playbackRate !== userSetSpeed && video.playbackRate !== 16) {
      // Ensure video plays at user's set speed (unless it's an ad at 16x)
      video.playbackRate = userSetSpeed;
    }
  }
}

// Function to check for and handle ads
function handleAds() {
  clickSkipButton();
  speedUpAd();
}

// Set up observers and intervals
let observer = null;

function startMonitoring() {
  // Check for ads every 500ms
  setInterval(handleAds, 500);

  // Also observe DOM changes for skip button appearance
  observer = new MutationObserver((mutations) => {
    handleAds();
  });

  const targetNode = document.body;
  if (targetNode) {
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

// Wait for page to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startMonitoring);
} else {
  startMonitoring();
}

// Also listen for video element changes
document.addEventListener('yt-navigate-finish', () => {
  console.log('YouTube Ad Skipper: Navigation detected, restarting monitoring');
  handleAds();
  addSpeedControlButton(); // Re-add button on navigation
});

// Function to create and add speed control button
function addSpeedControlButton() {
  // Check if button already exists
  if (document.querySelector('#custom-speed-control')) {
    return;
  }

  // Wait for YouTube player controls to be available
  const checkControls = setInterval(() => {
    const rightControls = document.querySelector('.ytp-right-controls');
    
    if (rightControls) {
      clearInterval(checkControls);
      
      // Create speed button
      const speedButton = document.createElement('button');
      speedButton.id = 'custom-speed-control';
      speedButton.className = 'ytp-button';
      speedButton.style.cssText = `
        width: 48px;
        font-size: 12px;
        font-weight: bold;
        color: white;
        cursor: pointer;
        background: transparent;
        border: none;
        padding: 0;
      `;
      speedButton.textContent = `${userSetSpeed}x`;
      speedButton.title = 'Click to cycle playback speed';
      
      // Add click handler
      speedButton.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Cycle to next speed
        currentSpeedIndex = (currentSpeedIndex + 1) % PLAYBACK_SPEEDS.length;
        userSetSpeed = PLAYBACK_SPEEDS[currentSpeedIndex];
        
        // Apply speed to video
        const video = document.querySelector('video');
        if (video && !wasInAd) {
          video.playbackRate = userSetSpeed;
        }
        
        // Update button text
        speedButton.textContent = `${userSetSpeed}x`;
        
        // Show notification
        showSpeedNotification(userSetSpeed);
        
        console.log(`YouTube Ad Skipper: Speed changed to ${userSetSpeed}x`);
      });
      
      // Right-click to decrease speed
      speedButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Cycle to previous speed
        currentSpeedIndex = (currentSpeedIndex - 1 + PLAYBACK_SPEEDS.length) % PLAYBACK_SPEEDS.length;
        userSetSpeed = PLAYBACK_SPEEDS[currentSpeedIndex];
        
        // Apply speed to video
        const video = document.querySelector('video');
        if (video && !wasInAd) {
          video.playbackRate = userSetSpeed;
        }
        
        // Update button text
        speedButton.textContent = `${userSetSpeed}x`;
        
        // Show notification
        showSpeedNotification(userSetSpeed);
        
        console.log(`YouTube Ad Skipper: Speed changed to ${userSetSpeed}x`);
      });
      
      // Insert button before settings button
      const settingsButton = rightControls.querySelector('.ytp-settings-button');
      if (settingsButton) {
        rightControls.insertBefore(speedButton, settingsButton);
      } else {
        rightControls.appendChild(speedButton);
      }
      
      console.log('YouTube Ad Skipper: Speed control button added');
    }
  }, 500);
  
  // Stop checking after 10 seconds
  setTimeout(() => clearInterval(checkControls), 10000);
}

// Function to show speed change notification
function showSpeedNotification(speed) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('#speed-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.id = 'speed-notification';
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px 40px;
    border-radius: 8px;
    font-size: 24px;
    font-weight: bold;
    z-index: 9999;
    pointer-events: none;
    font-family: 'YouTube Sans', 'Roboto', sans-serif;
  `;
  notification.textContent = `Speed: ${speed}x`;
  
  document.body.appendChild(notification);
  
  // Remove after 1 second
  setTimeout(() => {
    notification.style.transition = 'opacity 0.3s';
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 1000);
}

// Initialize speed control button
setTimeout(addSpeedControlButton, 2000);
