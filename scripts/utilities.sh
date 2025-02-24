#!/bin/bash

# Clean up old build logs from the build_logs folder
echo "Cleaning up old build logs..."
rm -rf ./build_log/build_logs/*

# Clean up old prediction results
echo "Cleaning up old prediction results..."
rm -rf ./build_log/prediction_results/*

# Clean up any temporary files
echo "Cleaning up temporary files..."
rm -rf ./node_modules
rm -rf ./dist

# Optionally, back up the current dist folder to a backup location
echo "Backing up dist folder..."
cp -r ./dist /backups/dist_backup/

echo "Cleanup and backup completed."
