#!/bin/bash

# Utility function to clean up old build logs
cleanup_logs() {
    find ./build_log/build_logs -type f -mtime +30 -exec rm {} \;
    echo "Cleaned up old build logs."
}

# Call cleanup
cleanup_logs
