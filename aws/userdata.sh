#!/bin/bash
yum install git docker -y
yum groupinstall "Development Tools" -y

export DOCKER_CONFIG="$HOME/.docker"
mkdir -p $DOCKER_CONFIG/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.30.1/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose

chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose

service docker start

git clone https://github.com/RenuzitV/voyager.git

cd voyager

make up
