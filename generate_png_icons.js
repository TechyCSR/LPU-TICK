// Create PNG icons from SVG for Chrome extension
// This script creates proper PNG files from our SVG icons

// Function to convert SVG to PNG
function svgToPng(svgData, width, height, fileName) {
  // Create a blob URL from the SVG data
  const svgBlob = new Blob([svgData], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(svgBlob);
  
  // Create an image element to load the SVG
  const img = new Image();
  img.onload = function() {
    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    // Get the 2D context and draw the image
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    
    // Convert the canvas to a PNG blob
    canvas.toBlob(function(blob) {
      // Create a download link
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      
      // Clean up
      URL.revokeObjectURL(a.href);
    }, 'image/png');
    
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
}

// Function to load an SVG file
function loadSvg(file, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', file, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send();
}

// Main function to convert SVG files to PNG
function convertIcons() {
  // Convert icon16.svg
  loadSvg('icons/icon16.svg', function(svgData) {
    svgToPng(svgData, 16, 16, 'icon16.png');
  });
  
  // Convert icon48.svg
  loadSvg('icons/icon48.svg', function(svgData) {
    svgToPng(svgData, 48, 48, 'icon48.png');
  });
  
  // Convert icon128.svg
  loadSvg('icons/icon128.svg', function(svgData) {
    svgToPng(svgData, 128, 128, 'icon128.png');
  });
}

// Run conversion when page loads
window.onload = convertIcons; 