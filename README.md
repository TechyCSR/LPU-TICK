# LPU Internet Login Helper

<div align="center">
  <img src="icons/store_icon.svg" width="440" alt="LPU Internet Login Helper">
  <p>
    <strong>A Chrome extension that automates the login process for LPU internet portal.</strong>
  </p>
  <p>
    <strong>Developed by <a href="https://techycsr.me" target="_blank">@TechyCSR</a></strong>
  </p>
</div>

## ✨ Features

- **Auto-check Policy Agreement**: Automatically checks the "I agree to the terms" checkbox
- **Username Formatting**: Automatically removes "@lpu.com" from usernames wherever it appears
- **Smart Login Button Handling**: Enables and clicks the login button when credentials are entered
- **Fast Response**: Minimal delay after credentials are entered for quick login
- **Conflict Avoidance**: Smart handling of website's automatic @lpu.com appending
- **Cross-Browser Support**: Works across different operating systems and browsers
- **Error Resilience**: Comprehensive error handling for reliable operation
- **Smart Element Detection**: Adapts to different versions of the login page
- **Clean UI**: Modern, user-friendly interface

## 🛠️ Installation

### From Chrome Web Store

1. Visit the [LPU Internet Login Helper on Chrome Web Store](https://chrome.google.com/webstore/detail/lpu-internet-login-helper)
2. Click "Add to Chrome"
3. Confirm the installation
4. The extension is now installed and will appear in your toolbar

### Manual Installation (Developer Mode)

1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the folder containing the extension
5. The extension is now installed and will appear in your toolbar

## 💻 Usage

The extension works automatically when you visit the LPU internet login pages:
- `https://internet.lpu.in/24online/servlet/E24onlineHTTPClient`
- `https://internet.lpu.in/24online/webpages/client.jsp`

No manual configuration is required, but you can:
1. Click the extension icon in your browser toolbar to check its status
2. Toggle automation on/off using the switch in the popup if needed

## ⚙️ How It Works

1. **Automatic Detection**: The extension automatically detects when you're on the LPU login page
2. **Policy Checkbox**: Automatically checks the required policy agreement checkbox
3. **Username Cleanup**: Removes any "@lpu.com" from your username as you type
4. **Login Assistance**: Enables the login button when all required fields are filled
5. **Smart Login**: Clicks the login button for you as soon as credentials are entered
6. **Conflict Management**: Handles the conflict between extension and website when dealing with @lpu.com

## 🚀 Publishing to Chrome Web Store

To publish this extension to the Chrome Web Store:

1. **Prepare the package**:
   - Zip all the files in this repository
   - Make sure to include: manifest.json, content.js, popup.js, popup.html, and the icons folder

2. **Create a Developer Account**:
   - Register as a developer at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Pay the one-time developer registration fee ($5 USD)

3. **Submit your extension**:
   - Click "New Item" in the developer dashboard
   - Upload the ZIP file of your extension
   - Fill in the required details:
     - Name: LPU Internet Login Helper
     - Description: Use the text from this README
     - Category: Productivity
     - Language: English
     - Primary locale: English (United States)

4. **Add store assets**:
   - Upload the `icons/store_icon.svg` as your promotional image
   - Add screenshots of the extension in action (taken from the LPU login page)
   - Icon: Use the 128x128 icon from the icons folder

5. **Publish**:
   - Choose between publishing to the public or as an unlisted extension
   - Submit for review (may take 1-3 business days)

## 🧑‍💻 Development

### Project Structure
- `manifest.json`: Extension configuration
- `content.js`: Main script that runs on the login page
- `popup.html`: User interface for the extension popup
- `popup.js`: Logic for the popup interface
- `icons/`: Icon files in various sizes
  - `store_icon.svg`: Store listing promotional image (440x280)

### Technical Details

- The extension uses **MutationObserver** to detect changes in the DOM
- Content script is injected when matching URL patterns are loaded
- Error handling via try/catch and recovery mechanisms
- Chrome Storage API for saving user preferences
- Event listeners for real-time response to user input

## 🔒 Privacy Policy

This extension:
- Does not collect or transmit any user data
- Does not store your LPU credentials
- Only operates on the specified LPU login pages
- Includes no analytics, tracking, or third-party code
- All automation happens locally in your browser

## 📝 License

Copyright © 2025 [TechyCSR](https://techycsr.me). All rights reserved.

This extension is for educational purposes and personal use only. Unauthorized reproduction or distribution is prohibited. The LPU brand and logo are property of Lovely Professional University.

---

<div align="center">
  Developed with ❤️ by <a href="https://techycsr.me">@TechyCSR</a>
</div> 