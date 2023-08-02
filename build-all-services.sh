#!/bin/bash
# Loop over each service and build it

find apps -maxdepth 1 -type d \( ! -name apps \) -exec bash -c '
  build_service() {
    service_name="$1"
    echo "Building $service_name..."
    npx nest build "$service_name"
  }

  build_service "$(basename "$0")"
' {} \;