#!/bin/bash
# Loop over each service and build it
# command="concurrently "
# find apps -maxdepth 1 -type d \( ! -name apps \) -exec bash -c '
  
#   echo command

#   build_service() {
#     service_name="$1"
#     echo service_name
#     command+=" $service_name"
#     echo "$command"
#     # echo "Building $service_name  ..."
#     # npx nest build "$service_name"
#   }

#   build_service "$(basename "$0")"
# ' {} \;

# echo "$command"
# eval "$command"




# Initialize the command variable as an empty string
command="concurrently "

build_service() {
  local service_name="$1"

  echo "Building $service_name ..."
  # Append the service name to the command string with a space separator
  command+="$service_name "
}

# Define the function outside the find -exec subshell
find apps -maxdepth 1 -type d \( ! -name apps \) -exec bash -c '
service_name="$1"
command+="$service_name"
# build_service 
"$(basename "$0")"
' {} \;

echo "$command"

# After processing all the services, execute the command
concurrently $command
