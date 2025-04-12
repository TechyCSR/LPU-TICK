// Popup.js - Handles the extension popup UI interactions

document.addEventListener('DOMContentLoaded', function() {
  const statusIndicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  const automationToggle = document.getElementById('automationToggle');
  
  // Load saved settings
  chrome.storage.sync.get(['automationEnabled'], function(result) {
    // If setting doesn't exist yet, default to true (enabled)
    const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
    
    // Update toggle switch state
    automationToggle.checked = automationEnabled;
    
    // Update status indicator
    updateStatusIndicator(automationEnabled);
  });
  
  // Handle toggle switch changes
  automationToggle.addEventListener('change', function() {
    const isEnabled = automationToggle.checked;
    
    // Save setting to Chrome storage
    chrome.storage.sync.set({ automationEnabled: isEnabled }, function() {
      console.log('Automation setting saved:', isEnabled);
    });
    
    // Update status indicator
    updateStatusIndicator(isEnabled);
  });
  
  // Function to update status indicator based on enabled state
  function updateStatusIndicator(isEnabled) {
    if (isEnabled) {
      statusIndicator.classList.remove('inactive');
      statusIndicator.classList.add('active');
      statusText.textContent = 'Active and ready';
    } else {
      statusIndicator.classList.remove('active');
      statusIndicator.classList.add('inactive');
      statusText.textContent = 'Automation disabled';
    }
  }
  
  // Check if we're on the target page
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentUrl = tabs[0].url;
    const isLpuLoginPage = currentUrl.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient');
    
    // If we're on the target page, show a special message
    if (isLpuLoginPage) {
      statusText.textContent = automationToggle.checked ? 
        'Active on LPU login page' : 
        'Disabled on LPU login page';
    }
  });
}); 