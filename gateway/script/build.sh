#!/usr/bin/env bash
set -e

VERSION_FILE="script/img-version-history"
touch $VERSION_FILE

version_history=$(cat $VERSION_FILE)

if [ -z version_history ]; then
  version_history=0
fi

version=$((version_history += 1))

echo $version > $VERSION_FILE

docker build . -t rs-ms/gateway:v$version