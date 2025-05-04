#!/bin/bash

if [ "$1" = "start" ]; then
    echo "Starting Nginx..."
    nginx -g "daemon off;"
else
    echo "Container started. Run 'docker exec suntrade/frontend/entrypoint.sh start' to start the service."
    tail -f /dev/null  # Keeps the container running but idle
fi  