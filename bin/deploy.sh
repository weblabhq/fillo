#!/bin/bash

# Exit on first error
set -e

SERVICE_NAME="weblab/fillo"
DOCKER_REGISTRY="141759028186.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME"

# Get Docker Registry login token
eval "$(aws ecr get-login --region us-east-1)"

# Get new version
SERVICE_VERSION=`node -e 'console.log(require("./package.json").version)'`

# Build docker image
docker build -t $SERVICE_NAME .

# Tag docker container
docker tag $SERVICE_NAME:latest $DOCKER_REGISTRY:$SERVICE_VERSION

# Push to new tag to private Docker Registry
docker push $DOCKER_REGISTRY:$SERVICE_VERSION

# Deploy to servers
servers=$(echo $SERVERS | tr ':' "\n")
for server in "${servers[@]}"
do
  ssh ec2-user@$server << EOF
IP=`/sbin/ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`
docker pull $DOCKER_REGISTRY:$SERVICE_VERSION
docker stop $SERVICE_NAME
docker rm -f $SERVICE_NAME
docker run -d \
  --restart=always \
  -e MONGO_URI=$MONGO_URI \
  -p 5002:3000 \
  --name $SERVICE_NAME \
  -e DOCKER_HOST=tcp://$IP:4000 \
  $DOCKER_REGISTRY:$SERVICE_VERSION
EOF
done
