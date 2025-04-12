// LPU Internet Login Helper
// Automatically helps with the login process at LPU internet login page

// Main function to run all automation features
function runAutomation() {
  console.log("LPU Internet Login Helper activated");
  
  // Check if automation is enabled in settings
  chrome.storage.sync.get(['automationEnabled'], function(result) {
    // Default to enabled if setting doesn't exist
    const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
    
    if (!automationEnabled) {
      console.log("Automation is disabled by user. Not running automation.");
      return;
    }
    
    // Function to check if we're on the login page
    function isLoginPage() {
      return window.location.href.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient');
    }
    
    // Main automation function
    function autoLogin() {
      if (!isLoginPage()) return;
      
      console.log("On LPU login page - starting automation");
      
      // 1. Auto-check the policy checkbox
      const policyCheckbox = document.getElementById('agreepolicy');
      if (policyCheckbox && !policyCheckbox.checked) {
        console.log("Checking policy checkbox");
        policyCheckbox.click();
      }
      
      // 2. Handle username field - remove @lpu.com if present
      const usernameField = document.querySelector('input[name="username"]');
      if (usernameField) {
        // Process existing value
        if (usernameField.value.endsWith('@lpu.com')) {
          usernameField.value = usernameField.value.replace('@lpu.com', '');
          console.log("Removed @lpu.com from username on load");
        }
        
        // Set up listener for future input
        usernameField.addEventListener('input', function() {
          const username = usernameField.value;
          if (username.endsWith('@lpu.com')) {
            usernameField.value = username.replace('@lpu.com', '');
            console.log("Removed @lpu.com from username");
          }
        });
      }
      
      // 3. Enable and monitor login button
      const passwordField = document.querySelector('input[name="password"]');
      const loginButton = document.getElementById('loginbtn');
      
      if (usernameField && passwordField && loginButton) {
        // Function to enable login button when conditions are met
        function checkEnableLogin() {
          const policyChecked = policyCheckbox ? policyCheckbox.checked : false;
          const hasUsername = usernameField.value.trim() !== '';
          const hasPassword = passwordField.value.trim() !== '';
          
          if (policyChecked && hasUsername && hasPassword) {
            loginButton.disabled = false;
            console.log("Login button enabled");
            
            // Attempt to click the login button after a short delay
            setTimeout(function() {
              if (loginButton.disabled === false) {
                console.log("Clicking login button");
                loginButton.click();
              }
            }, 500);
          }
        }
        
        // Set up event listeners for input fields
        usernameField.addEventListener('input', checkEnableLogin);
        passwordField.addEventListener('input', checkEnableLogin);
        
        // If policy checkbox is checked, also check enable conditions
        if (policyCheckbox) {
          policyCheckbox.addEventListener('change', checkEnableLogin);
        }
        
        // Run once on page load
        checkEnableLogin();
      }
    }
    
    // Run automations with a short delay to ensure page is loaded
    setTimeout(function() {
      autoLogin();
    }, 500);
    
    // Also run when mutations are detected in the DOM
    // This helps with dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
      autoLogin();
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
  });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAutomation);
} else {
  // DOM already loaded, run now
  runAutomation();
}

// Also run when page is fully loaded to catch any late changes
window.addEventListener('load', function() {
  console.log("Page fully loaded, running automation again");
  runAutomation();
}); 