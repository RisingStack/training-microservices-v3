#!/bin/bash
set -e

eval $(minikube docker-env)

script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

for app in "user" "product" "gateway" "front-end"; do
  echo "cding into: $script_directory/$app"
  cd "$script_directory/$app"
  npm run docker-build
  kubectl create -f ./k8s || true
done

docker-compose up -d

sleep 5

docker exec $(docker ps --format '{{.ID}}' -f name=trainingmicroservicesv3_db) \
  psql -d \
  test-products-db -c "CREATE DATABASE \"test-users-db\""

./migrate.sh
