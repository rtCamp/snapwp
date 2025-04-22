#!/bin/bash

# set -ex

# vars
registry_url="http://localhost:4873"
username="admin"
password="password"
email="admin@example.com"

# Check if Docker daemon is running
if (! docker stats --no-stream ); then
  echo "Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

# Start Docker with the specified command
echo "Starting Docker containers for Verdaccio..."
npm run local-registry:start
if [ $? -ne 0 ]; then
  echo "Failed to start Docker containers. Exiting."
  exit 1
fi

echo "Local npm registry started."

# Wait for the registry to be ready
echo "Waiting for the registry to be ready..."
while ! curl -s --head --fail "$registry_url"; do
  sleep 2
  echo "Waiting..."
done

npx npm-cli-login -u $username -p $password -e test@example.com -r $registry_url
echo "User '$username' created successfully."

echo "Logged in as '$username' successfully."

echo "Installing dependencies"
npm i

# build broken cause server is not running for codegen
echo "Building packages"
npm run build

echo "Deleting previous published packages"
rm -r ./.verdaccio/storage/*

echo "Publishing workspaces to private registry"
npm publish --workspaces --registry $registry_url --access public  # access public is needed for initial publish (ci)

echo "Logging out"
npm logout --registry $registry_url
