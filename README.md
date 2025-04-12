# LPU Internet Login Helper

A Chrome extension that automates the login process on the LPU internet login page.

## Features

- **Auto-check Policy Agreement**: Automatically checks the "I agree to the terms" checkbox
- **Username Formatting**: Automatically removes "@lpu.com" from usernames if present
- **Quick Login**: Enables the login button when all fields are properly filled
- **Modern UI**: Clean, user-friendly interface

## Installation

Since this extension is not (yet) available on the Chrome Web Store, you'll need to install it in developer mode:

1. Download or clone this repository to your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the folder containing the extension
5. The extension is now installed and will appear in your toolbar

## Usage

The extension works automatically when you visit the LPU internet login page:
- `https://internet.lpu.in/24online/servlet/E24onlineHTTPClient`

No manual configuration is required, but you can:
1. Click the extension icon in your browser toolbar to see status
2. Toggle automation on/off using the switch in the popup

## Development

### Project Structure
- `manifest.json`: Extension configuration
- `content.js`: Main script that runs on the login page
- `popup.html`: User interface for the extension popup
- `popup.js`: Logic for the popup interface
- `icons/`: Icon files in various sizes

## Credits

Developed by [@TechyCSR](https://techycsr.me) 