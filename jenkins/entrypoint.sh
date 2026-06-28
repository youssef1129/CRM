#!/bin/bash
set -e

DOCKER_SOCK=/var/run/docker.sock
DOCKER_GID=$(stat -c '%g' "$DOCKER_SOCK")

# Remove any existing group with that GID to avoid conflicts
EXISTING_GROUP=$(getent group "$DOCKER_GID" | cut -d: -f1 || true)

if [ -n "$EXISTING_GROUP" ] && [ "$EXISTING_GROUP" != "docker" ]; then
    # Another group already owns this GID — add jenkins to that group instead
    usermod -aG "$EXISTING_GROUP" jenkins
elif getent group docker > /dev/null 2>&1; then
    groupmod -g "$DOCKER_GID" docker
    usermod -aG docker jenkins
else
    groupadd -g "$DOCKER_GID" docker
    usermod -aG docker jenkins
fi

exec gosu jenkins /usr/bin/tini -- /usr/local/bin/jenkins.sh "$@"