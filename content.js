// LPU Internet Login Helper
// Automatically helps with the login process at LPU internet login page
// Developed by @TechyCSR (https://techycsr.me)
// Copyright (c) 2025 TechyCSR. All rights reserved.
//
// DISCLAIMER: This project is not affiliated with, authorized by, or endorsed by 
// Lovely Professional University. It is an independent, unofficial tool created 
// for educational purposes only.

// Error handling wrapper function
function safeExecute(fn, errorMessage) {
  try {
    return fn();
  } catch (error) {
    return null;
  }
}

function runAutomation() {
  safeExecute(() => {
    chrome.storage.sync.get(['automationEnabled'], function(result) {
      const automationEnabled = result.automationEnabled !== undefined ? result.automationEnabled : true;
      
      if (!automationEnabled) {
        return;
      }
      
      function isLoginPage() {
        try {
          return window.location.href && (
            window.location.href.includes('internet.lpu.in/24online/servlet/E24onlineHTTPClient') || 
            window.location.href.includes('internet.lpu.in/24online/webpages/client.jsp')
          );
        } catch (err) {
          return false;
        }
      }
      
      window.isSubmitting = false;
      
      function autoLogin() {
        if (!isLoginPage()) return;
        
        safeExecute(() => {
          const policyCheckbox = document.getElementById('agreepolicy') || document.querySelector('input[type="checkbox"][name="agree"]');
          if (policyCheckbox && !policyCheckbox.checked) {
            policyCheckbox.click();
          }
        });
        
        const usernameField = safeExecute(() => {
          return document.querySelector('input[name="username"]') || document.querySelector('input[id="username"]');
        });
        
        if (usernameField) {
          function cleanUsernameIfNeeded() {
            try {
              if (window.isSubmitting) return;
              
              if (usernameField.value && usernameField.value.includes('@lpu.com')) {
                usernameField.value = usernameField.value.replace(/@lpu\.com/g, '');
              }
            } catch (err) {
            }
          }
          
          cleanUsernameIfNeeded();
          
          safeExecute(() => {
            usernameField.addEventListener('input', function() {
              if (!window.isSubmitting) {
                cleanUsernameIfNeeded();
                if (typeof checkEnableLogin === 'function') {
                  checkEnableLogin();
                }
              }
            });
          });
          
          safeExecute(() => {
            const form = usernameField.closest('form');
            if (form) {
              form.addEventListener('submit', function(e) {
                window.isSubmitting = true;
                
                setTimeout(function() {
                  window.isSubmitting = false;
                }, 2000);
              });
            }
          });
        }
        
        const passwordField = safeExecute(() => {
          return document.querySelector('input[name="password"]') || document.querySelector('input[id="password"]') || document.querySelector('input[type="password"]');
        });
        
        const loginButton = safeExecute(() => {
          return document.getElementById('loginbtn') || document.querySelector('input[type="submit"]') || document.querySelector('button[type="submit"]');
        });
        
        const policyCheckbox = safeExecute(() => {
          return document.getElementById('agreepolicy') || document.querySelector('input[type="checkbox"][name="agree"]');
        });
        
        if (usernameField && passwordField && loginButton) {
          function checkEnableLogin() {
            try {
              const policyChecked = policyCheckbox ? policyCheckbox.checked : true;
              const hasUsername = usernameField.value && usernameField.value.trim() !== '';
              const hasPassword = passwordField.value && passwordField.value.trim() !== '';
              
              if (policyChecked && hasUsername && hasPassword) {
                if (loginButton.disabled) {
                  loginButton.disabled = false;
                }
                
                const now = Date.now();
                window.lastInputTime = now;
                
                if (!window.loginButtonClicked && !window.isSubmitting) {
                  setTimeout(function() {
                    try {
                      if (window.lastInputTime === now &&
                          loginButton.disabled === false && 
                          policyChecked && hasUsername && hasPassword &&
                          !window.isSubmitting) {
                        window.loginButtonClicked = true;
                        window.isSubmitting = true;
                        
                        loginButton.click();
                        
                        setTimeout(function() {
                          window.loginButtonClicked = false;
                          window.isSubmitting = false;
                        }, 5000);
                      }
                    } catch (err) {
                      window.loginButtonClicked = false;
                      window.isSubmitting = false;
                    }
                  }, 200);
                }
              }
            } catch (err) {
            }
          }
          
          safeExecute(() => {
            usernameField.addEventListener('input', function() {
              window.lastInputTime = Date.now();
              checkEnableLogin();
            });
          });
          
          safeExecute(() => {
            passwordField.addEventListener('input', function() {
              window.lastInputTime = Date.now();
              checkEnableLogin();
            });
            
            passwordField.addEventListener('keydown', function(e) {
              if (e.key === 'Enter' && !window.isSubmitting) {
                if (usernameField.value && usernameField.value.trim() !== '' && 
                    passwordField.value && passwordField.value.trim() !== '') {
                  window.isSubmitting = true;
                }
              }
            });
          });
          
          if (policyCheckbox) {
            safeExecute(() => {
              policyCheckbox.addEventListener('change', checkEnableLogin);
            });
          }
          
          safeExecute(() => {
            loginButton.addEventListener('click', function() {
              window.isSubmitting = true;
              
              setTimeout(function() {
                window.isSubmitting = false;
              }, 2000);
            });
          });
          
          checkEnableLogin();
        }
      }
      
      autoLogin();
      
    
      safeExecute(() => {
        const observer = new MutationObserver(function(mutations) {
          if (!window.isSubmitting) {
            autoLogin();
          }
        });
        
        if (document.body) {
          observer.observe(document.body, { 
            childList: true,
            subtree: true
          });
        }
      });
    });
  });
}

safeExecute(() => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAutomation);
  } else {
    runAutomation();
  }
});

safeExecute(() => {
  window.addEventListener('load', function() {
    if (!window.isSubmitting) {
      runAutomation();
    }
  });
}); 