// LPU Internet Login Helper
// Automatically helps with the login process at LPU internet login page
// Developed by @TechyCSR (https://techycsr.me)
// Copyright (c) 2025 TechyCSR. All rights reserved.

// Error handling wrapper function
function safeExecute(fn, errorMessage) {
  try {
    return fn();
  } catch (error) {
    console.error(errorMessage || 'Error in LPU Internet Helper:', error);
    return null;
  }
}

// Main function to run all automation features
function runAutomation() {
  console.log("LPU Internet Login Helper activated");
  
  // Check if automation is enabled in settings
  safeExecute(() => {
    chrome.storage.sync.get(['automationEnabled'], function(result) {
      // Default to enabled if setting doesn't exist
      const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
      
      if (!automationEnabled) {
        console.log("Automation is disabled by user. Not running automation.");
        return;
      }
      
      // Function to check if we're on the login page
      function isLoginPage() {
        try {
          return window.location.href && (
            window.location.href.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient') || 
            window.location.href.includes('internet.lpu.in/24online/webpages/client.jsp')
          );
        } catch (err) {
          console.error('Error checking URL:', err);
          return false;
        }
      }
      
      // Flag to manage the interaction between extension and website
      window.isSubmitting = false;
      
      // Main automation function
      function autoLogin() {
        if (!isLoginPage()) return;
        
        console.log("On LPU login page - starting automation");
        
        // 1. Auto-check the policy checkbox
        safeExecute(() => {
          const policyCheckbox = document.getElementById('agreepolicy') || document.querySelector('input[type="checkbox"][name="agree"]');
          if (policyCheckbox && !policyCheckbox.checked) {
            console.log("Checking policy checkbox");
            policyCheckbox.click();
          }
        }, 'Error handling policy checkbox:');
        
        // 2. Handle username field - remove @lpu.com if present
        const usernameField = safeExecute(() => {
          return document.querySelector('input[name="username"]') || document.querySelector('input[id="username"]');
        }, 'Error finding username field:');
        
        if (usernameField) {
          // Clean up username only if not in submission process
          function cleanUsernameIfNeeded() {
            try {
              if (window.isSubmitting) return;
              
              if (usernameField.value && usernameField.value.includes('@lpu.com')) {
                usernameField.value = usernameField.value.replace(/@lpu\.com/g, '');
                console.log("Removed @lpu.com from username");
              }
            } catch (err) {
              console.error('Error cleaning username:', err);
            }
          }
          
          // Process existing value on initial load
          cleanUsernameIfNeeded();
          
          // Set up listener for future input, but don't interfere during form submission
          safeExecute(() => {
            usernameField.addEventListener('input', function() {
              if (!window.isSubmitting) {
                cleanUsernameIfNeeded();
                // Trigger validation for quick response
                if (typeof checkEnableLogin === 'function') {
                  checkEnableLogin();
                }
              }
            });
          }, 'Error setting up username input listener:');
          
          // Find the form to intercept submission
          safeExecute(() => {
            const form = usernameField.closest('form');
            if (form) {
              form.addEventListener('submit', function(e) {
                console.log("Form submission detected. Username will be handled by website.");
                window.isSubmitting = true;
                
                // Reset the flag after submission is complete
                setTimeout(function() {
                  window.isSubmitting = false;
                }, 2000);
              });
            }
          }, 'Error setting up form submission listener:');
        }
        
        // 3. Enable and monitor login button
        const passwordField = safeExecute(() => {
          return document.querySelector('input[name="password"]') || document.querySelector('input[id="password"]') || document.querySelector('input[type="password"]');
        }, 'Error finding password field:');
        
        const loginButton = safeExecute(() => {
          return document.getElementById('loginbtn') || document.querySelector('input[type="submit"]') || document.querySelector('button[type="submit"]');
        }, 'Error finding login button:');
        
        const policyCheckbox = safeExecute(() => {
          return document.getElementById('agreepolicy') || document.querySelector('input[type="checkbox"][name="agree"]');
        });
        
        if (usernameField && passwordField && loginButton) {
          // Function to enable login button when conditions are met
          function checkEnableLogin() {
            try {
              const policyChecked = policyCheckbox ? policyCheckbox.checked : true; // If no checkbox, assume true
              const hasUsername = usernameField.value && usernameField.value.trim() !== '';
              const hasPassword = passwordField.value && passwordField.value.trim() !== '';
              
              if (policyChecked && hasUsername && hasPassword) {
                if (loginButton.disabled) {
                  loginButton.disabled = false;
                  console.log("Login button enabled");
                }
                
                // Store the last input time to detect when user stops typing
                const now = Date.now();
                window.lastInputTime = now;
                
                // Attempt to click the login button immediately if not already clicked
                if (!window.loginButtonClicked && !window.isSubmitting) {
                  // Click right away if user has finished entering credentials
                  setTimeout(function() {
                    try {
                      // Only proceed if no new input has happened
                      if (window.lastInputTime === now &&
                          loginButton.disabled === false && 
                          policyChecked && hasUsername && hasPassword &&
                          !window.isSubmitting) {
                        console.log("Clicking login button");
                        window.loginButtonClicked = true;
                        window.isSubmitting = true;
                        
                        // Click the login button
                        loginButton.click();
                        
                        // Reset flags after some time
                        setTimeout(function() {
                          window.loginButtonClicked = false;
                          window.isSubmitting = false;
                        }, 5000);
                      }
                    } catch (err) {
                      console.error('Error during login button click:', err);
                      window.loginButtonClicked = false;
                      window.isSubmitting = false;
                    }
                  }, 200); // Very short delay for immediate login
                }
              }
            } catch (err) {
              console.error('Error in checkEnableLogin:', err);
            }
          }
          
          // Set up event listeners for input fields with immediate validation
          safeExecute(() => {
            usernameField.addEventListener('input', function() {
              window.lastInputTime = Date.now();
              checkEnableLogin();
            });
          }, 'Error setting up username input validation:');
          
          safeExecute(() => {
            passwordField.addEventListener('input', function() {
              window.lastInputTime = Date.now();
              checkEnableLogin();
            });
            
            // If Enter key is pressed in password field, attempt to click login button
            passwordField.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' && !window.isSubmitting) {
                if (usernameField.value && usernameField.value.trim() !== '' && 
                    passwordField.value && passwordField.value.trim() !== '') {
                  console.log("Enter key detected, attempting login");
                  window.isSubmitting = true;
                  // No need to click - browser will submit the form automatically
                }
              }
            });
          }, 'Error setting up password field listeners:');
          
          // If policy checkbox is checked, also check enable conditions
          if (policyCheckbox) {
            safeExecute(() => {
              policyCheckbox.addEventListener('change', checkEnableLogin);
            }, 'Error setting up policy checkbox listener:');
          }
          
          // Add a specific handler for login button to manage submission state
          safeExecute(() => {
            loginButton.addEventListener('click', function() {
              window.isSubmitting = true;
              console.log("Login button clicked manually, suspending @lpu.com removal");
              
              // Reset the flag after submission completes
              setTimeout(function() {
                window.isSubmitting = false;
              }, 2000);
            });
          }, 'Error setting up login button click listener:');
          
          // Run once on page load
          checkEnableLogin();
        }
      }
      
      // Run automations immediately for faster response
      autoLogin();
      
      // Also run when mutations are detected in the DOM
      // This helps with dynamically loaded content
      safeExecute(() => {
        const observer = new MutationObserver(function(mutations) {
          // Only proceed with auto-login if not currently submitting
          if (!window.isSubmitting) {
            autoLogin();
          }
        });
        
        // Start observing the document body for DOM changes
        if (document.body) {
          observer.observe(document.body, { 
            childList: true,
            subtree: true
          });
        }
      }, 'Error setting up DOM mutation observer:');
    });
  }, 'Error checking automation settings:');
}

// Initialize as soon as possible
safeExecute(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAutomation);
  } else {
    // DOM already loaded, run now
    runAutomation();
  }
}, 'Error during initialization:');

// Also run when page is fully loaded to catch any late changes
safeExecute(() => {
  window.addEventListener('load', function() {
    console.log("Page fully loaded, running automation again");
    if (!window.isSubmitting) {
      runAutomation();
    }
  });
}, 'Error setting up load event listener:'); 