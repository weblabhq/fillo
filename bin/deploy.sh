#!/bin/bash

# Exit on first error
set -e

SERVICE_NAME="weblab/fillo"
DOCKER_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME"

# Get Docker Registry login token
eval "$(aws ecr get-login --region us-east-1)"

# Get new version
SERVICE_VERSION=`node -e 'console.log(require("./package.json").version)'`

# Export version
export SERVICE_VERSION=$SERVICE_VERSION

# Build docker image
docker build -t $SERVICE_NAME .

# Tag docker container
docker tag $SERVICE_NAME:latest $DOCKER_REGISTRY:$SERVICE_VERSION

# Push to new tag to private Docker Registry
docker push $DOCKER_REGISTRY:$SERVICE_VERSION

# Remove cached hosts file
rm -f production
touch production
echo "[weblab-managers]" > production

# Extract deployment servers
IFS=':'; servers=($SERVERS)
for server in "${servers[@]}"
do
  echo "$server" > production
done

cat production

# Deploy to servers
ansible-playbook -i production bin/fillo.yml
