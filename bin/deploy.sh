#!/bin/bash

# Exit on first error
set -e

SERVICE_NAME="weblab/fillo"
DOCKER_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME"

# Get Docker Registry login token
eval "$(aws ecr get-login --region us-east-1)"

# Get new version
GIT_COMMIT_HASH=`git rev-parse --short HEAD`
SERVICE_VERSION=`node -e 'console.log(require("./package.json").version)'`
SERVICE_VERSION="$SERVICE_VERSION-$GIT_COMMIT_HASH"

# Export version
export SERVICE_VERSION=$SERVICE_VERSION

# Build docker image
docker build -t $SERVICE_NAME .

# Tag docker container
docker tag $SERVICE_NAME:latest $DOCKER_REGISTRY:$SERVICE_VERSION

# Push to new tag to private Docker Registry
docker push $DOCKER_REGISTRY:$SERVICE_VERSION

# Remove cached hosts file
rm -f hosts

# Extract deployment servers and create Ansible hosts file
IFS=':'; servers=($DEPLOY_SERVERS)
for server in "${servers[@]}"
do
  echo "$server" >> hosts
done

# Deploy to servers
ansible-playbook -i hosts bin/deploy-playbook.yml
