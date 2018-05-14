# freebie-api-server-api-gateway
API Gateway for the freebie-api-server web client

# Steps

```sh
$ minikube start
$ eval $(minikube docker-env)
$ npm run build
$ kubectl create -f k8s/gateway-deployment.yml
$ kubectl get pod
NAME                      READY     STATUS    RESTARTS   AGE
gateway-85d4cf574-rfvqp   0/1       Error     1          6s

$ kubectl logs gateway-85d4cf574-rfvqp
# create secret
$ kubectl create secret generic gateway --from-literal=jwtSecret=my-secret
```

Add this to spec.template.spec.containers in k8s/gateway-deployment.yml

```yaml
env:
- name: JWT_SECRET
  valueFrom:
    secretKeyRef:
      name: gateway
      key: jwtSecret
```