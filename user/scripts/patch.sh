#!/usr/bin/env bash
set -e

VERSION_FILE="scripts/img-version-history"
PATCH_FILE="scripts/patch.json"
VERSION_PLACEHOLDER="{{VERSION}}"
touch $VERSION_FILE

version=$(cat $VERSION_FILE)

if [ -z version ]; then
  echo "No version history, exiting"
  exit 1
fi

PATCH=$(cat scripts/patch.json | tr "\n" " " | sed 's/ //g' | sed "s/${VERSION_PLACEHOLDER}/${version}/g")

kubectl patch deployment gateway -p $PATCH