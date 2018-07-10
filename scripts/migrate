#!/bin/bash

function get_pod () {
  kubectl get pods -l app="$1" -o go-template --template '{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}' | head -1
}

product_pod_name=$(get_pod product)
user_pod_name=$(get_pod user)

for pod_name in $user_pod_name $product_pod_name; do
  kubectl exec $pod_name npm run db-migrate
done

kubectl exec $product_pod_name npm run db-seed

