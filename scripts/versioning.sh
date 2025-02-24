#!/bin/bash

# Fetch the current version from the version.txt file
CURRENT_VERSION=$(cat version.txt)

# Split the current version into its components (major.minor.patch)
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

# Increment the patch version (you can modify this logic based on your versioning strategy)
PATCH=$((PATCH + 1))

# Construct the new version
NEW_VERSION="${MAJOR}.${MINOR}.${PATCH}"

# Save the new version back to version.txt
echo "$NEW_VERSION" > version.txt

# Output the new version
echo "New Version: $NEW_VERSION"
