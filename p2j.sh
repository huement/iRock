#!/bin/bash

# Ensure ImageMagick is installed
if ! command -v convert &> /dev/null; then
  echo "ImageMagick is not installed. Please install it using 'sudo apt install imagemagick' and try again."
  exit 1
fi

# Directory containing PNG files
INPUT_DIR="./thumbnails"

# Check if the directory exists
if [ ! -d "$INPUT_DIR" ]; then
  echo "Directory $INPUT_DIR does not exist."
  exit 1
fi

# Convert PNG files to JPG
for file in "$INPUT_DIR"/*.png; do
  if [ -f "$file" ]; then
    # Get the base filename without extension
    base_name=$(basename "$file" .png)
    # Convert to JPG
    convert "$file" "$INPUT_DIR/$base_name.jpg"
    echo "Converted: $file -> $INPUT_DIR/$base_name.jpg"
  fi
done

echo "Conversion completed!"
