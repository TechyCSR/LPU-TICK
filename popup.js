// Popup.js - Handles the extension popup UI interactions
// Developed by @TechyCSR (https://techycsr.me)
// Copyright (c) 2025 TechyCSR. All rights reserved.

document.addEventListener('DOMContentLoaded', function() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  const automationToggle = document.getElementById('automationToggle');
  
  // Ensure elements exist before proceeding
  if (!statusIndicator || !statusText || !automationToggle) {
    console.error('Required DOM elements not found. Check popup.html for changes.');
    return;
  }
  
  // Load saved settings
  try {
    chrome.storage.sync.get(['automationEnabled'], function(result) {
      try {
        // If setting doesn't exist yet, default to true (enabled)
        const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
        
        // Update toggle switch state
        automationToggle.checked = automationEnabled;
        
        // Update status indicator
        updateStatusIndicator(automationEnabled);
      } catch (err) {
        console.error('Error processing storage data:', err);
        // Set default state in case of error
        updateStatusIndicator(true);
      }
    });
  } catch (err) {
    console.error('Error accessing Chrome storage:', err);
    // Set default state in case of error
    updateStatusIndicator(true);
  }
  
  // Handle toggle switch changes
  automationToggle.addEventListener('change', function() {
    try {
      const isEnabled = automationToggle.checked;
      
      // Save setting to Chrome storage
      chrome.storage.sync.set({ automationEnabled: isEnabled }, function() {
        console.log('Automation setting saved:', isEnabled);
      });
      
      // Update status indicator
      updateStatusIndicator(isEnabled);
    } catch (err) {
      console.error('Error handling toggle change:', err);
    }
  });
  
  // Function to update status indicator based on enabled state
  function updateStatusIndicator(isEnabled) {
    try {
      if (isEnabled) {
        statusIndicator.classList.remove('inactive');
        statusIndicator.classList.add('active');
        statusText.textContent = 'Active and ready';
      } else {
        statusIndicator.classList.remove('active');
        statusIndicator.classList.add('inactive');
        statusText.textContent = 'Automation disabled';
      }
    } catch (err) {
      console.error('Error updating status indicator:', err);
    }
  }
  
  // Check if we're on the target page
  try {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        if (tabs && tabs.length > 0 && tabs[0] && tabs[0].url) {
          const currentUrl = tabs[0].url;
          const isLpuLoginPage = 
            currentUrl.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient') ||
            currentUrl.includes('internet.lpu.in/24online/webpages/client.jsp');
          
          // If we're on the target page, show a special message
          if (isLpuLoginPage) {
            statusText.textContent = automationToggle.checked ? 
              'Active on LPU login page' : 
              'Disabled on LPU login page';
          }
        } else {
          console.log('Not on a target page or unable to determine page URL');
        }
      } catch (err) {
        console.error('Error processing tab information:', err);
      }
    });
  } catch (err) {
    console.error('Error querying tabs:', err);
  }
}); 