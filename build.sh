#!/usr/bin/env bash
set -e

app_name=$1
image_name=rs-ms/$app_name
current_version=$(docker images $image_name --format "{{.Tag}}" | head -2 | tail -1 | grep -o "[0-9]\+" || echo 0)
next_version=$(( $current_version + 1))
docker build -t $image_name:v$next_version -t $image_name:latest .

kubectl delete pod -l app=$app_name
