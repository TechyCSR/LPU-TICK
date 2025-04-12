#!/bin/bash

# Check if ImageMagick is installed
if command -v convert >/dev/null 2>&1; then
  echo "ImageMagick found. Generating icons..."
  
  # Generate icon in different sizes
  convert -background none icons/icon.svg -resize 16x16 icons/icon16.png
  convert -background none icons/icon.svg -resize 48x48 icons/icon48.png
  convert -background none icons/icon.svg -resize 128x128 icons/icon128.png
  
  echo "Icons generated successfully!"
else
  # If ImageMagick is not available, create simple colored squares
  echo "ImageMagick not found. Creating simple placeholder icons..."
  
  # Function to create a simple colored square icon
  create_simple_icon() {
    SIZE=$1
    echo "Creating $SIZE x $SIZE icon..."
    cat > "icons/icon$SIZE.png" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="$SIZE" height="$SIZE" viewBox="0 0 $SIZE $SIZE">
  <rect width="$SIZE" height="$SIZE" fill="#4a2c82" />
  <circle cx="$(($SIZE/2))" cy="$(($SIZE/2))" r="$(($SIZE/3))" fill="white" />
  <text x="$(($SIZE/2))" y="$(($SIZE/2+$SIZE/8))" font-family="sans-serif" font-size="$(($SIZE/3))" fill="#4a2c82" text-anchor="middle">LPU</text>
</svg>
EOF
  }
  
  # Create icons in different sizes
  create_simple_icon 16
  create_simple_icon 48
  create_simple_icon 128
  
  echo "Simple placeholder icons created. Please rename them from SVG to PNG or use a tool to convert them."
fi

echo "Done!" 