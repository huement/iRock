#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${RED}Error: ffmpeg is not installed.${NC}"
    echo "Please run: brew install ffmpeg"
    exit 1
fi

# Get target path (default to current directory)
TARGET_PATH="${1:-.}"
TARGET_PATH="$(cd "$TARGET_PATH" 2>/dev/null && pwd)"
if [ -z "$TARGET_PATH" ]; then
    echo -e "${RED}Error: Invalid path: ${1:-.}${NC}"
    exit 1
fi

# Loop through all .mov and .mp4 files in the target directory
shopt -s nullglob
cd "$TARGET_PATH" || exit 1
files=(*.mov *.mp4 *.MOV *.MP4)

if [ ${#files[@]} -eq 0 ]; then
    echo -e "${RED}No .mov or .mp4 files found in $TARGET_PATH${NC}"
    exit 0
fi

for file in "${files[@]}"; do
    filename=$(basename "$file")
    name="${filename%.*}"
    
    # Output to same folder: .mov → .mp4 (new file), .mp4 → temp then replace
    if [[ "$filename" =~ \.(mov|MOV)$ ]]; then
        output="${name}.mp4"
        use_temp=0
    else
        output="${name}.tmp.mp4"
        use_temp=1
    fi
    
    echo -e "${BLUE}Processing: $file${NC}"

    # --- GENERATE UNIVERSAL MP4 (H.264 + AAC) ---
    # -c:v libx264: Use H.264 video codec (Universal compatibility)
    # -crf 23: Quality level (Lower is better quality, 23 is standard balance)
    # -preset slow: Better compression (takes longer to encode, saves bandwidth)
    # -c:a aac: AAC Audio
    # -movflags +faststart: ESSENTIAL for web. Moves metadata to start so video plays while downloading.
    # -pix_fmt yuv420p: Ensures compatibility with QuickTime/Safari/Windows
    echo "  > Generating optimized MP4..."
    if ffmpeg -i "$file" \
        -c:v libx264 -crf 23 -preset slow \
        -c:a aac -b:a 128k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -y "$output"; then
        if [ "$use_temp" -eq 1 ]; then
            mv "$output" "$file"
            echo -e "  ${GREEN}Replaced: $file${NC}"
        else
            echo -e "  ${GREEN}Created: $output${NC}"
        fi
    else
        echo -e "  ${RED}Failed: $file${NC}"
        [ -f "$output" ] && rm -f "$output"
    fi
done