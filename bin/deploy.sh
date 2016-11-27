#!/bin/bash

# Exit on first error
set -e

SERVICE_NAME="weblab/fillo"
DOCKER_REGISTRY="$AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/$SERVICE_NAME"

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
IFS=':'; servers=($SERVERS)
for server in "${servers[@]}"
do
  ssh ec2-user@$server << EOF

    # Get AWS ECR login token
    eval "\$(aws ecr get-login --region us-east-1)"
    # Set container name
    CONTAINER_NAME=fillo
    docker pull $DOCKER_REGISTRY:$SERVICE_VERSION
    docker stop \$CONTAINER_NAME
    docker rm -f \$CONTAINER_NAME
    docker run -d \
      --restart=always \
      -e MONGO_URI=$MONGO_URI \
      -p 5002:3000 \
      --name \$CONTAINER_NAME \
      $DOCKER_REGISTRY:$SERVICE_VERSION

EOF
done
