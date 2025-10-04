// Popup.js - Handles the extension popup UI interactions
// Developed by @TechyCSR (https://techycsr.dev)
// Copyright (c) 2025 TechyCSR. All rights reserved.
//
// DISCLAIMER: This project is not affiliated with, authorized by, or endorsed by 
// Lovely Professional University. It is an independent, unofficial tool created 
// for educational purposes only.

document.addEventListener('DOMContentLoaded', function() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  const automationToggle = document.getElementById('automationToggle');
  
  if (!statusIndicator || !statusText || !automationToggle) {
    return;
  }
  
  try {
    chrome.storage.sync.get(['automationEnabled'], function(result) {
      try {
        const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
        
        automationToggle.checked = automationEnabled;
        
        updateStatusIndicator(automationEnabled);
      } catch (err) {
        updateStatusIndicator(true);
      }
    });
  } catch (err) {
    updateStatusIndicator(true);
  }
  
  automationToggle.addEventListener('change', function() {
    try {
      const isEnabled = automationToggle.checked;
      
      chrome.storage.sync.set({ automationEnabled: isEnabled });
      
      updateStatusIndicator(isEnabled);
    } catch (err) {
      // Silent error handling
    }
  });
  
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
    }
  }
  
  try {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      try {
        if (tabs && tabs.length > 0 && tabs[0] && tabs[0].url) {
          const currentUrl = tabs[0].url;
          const isLpuLoginPage = 
            currentUrl.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient') ||
            currentUrl.includes('internet.lpu.in/24online/webpages/client.jsp');
          
          if (isLpuLoginPage) {
            statusText.textContent = automationToggle.checked ? 
              'Active on LPU login page' : 
              'Disabled on LPU login page';
          }
        }
      } catch (err) {
      }
    });
  } catch (err) {
  }
}); 