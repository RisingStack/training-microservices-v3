# training-microservices-v3

## Prerequisites

- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - kubernetes manager CLI
- [minikube](https://github.com/kubernetes/minikube) - local virtualized kubernetes
```bash
$ minikube start # start local kubernetes
$ eval $(minikube docker-env) # connect docker to minikube machine
$ minikube addons enable ingress # we will need to use ingress resources
$ docker-compose up -d # start databases
```

Running databases inside of the "cluster" is not part of the current training session. To emulate hosted database
environments we created a docker-comopse script that runs a postgresql database on the minikube machine but outside of
kubernetes.

Navigate to http://localhost:5433 to view the database browser (pgweb). By default it will create a database for the
one of the services. Navigate to the query tab and run the following query:
```sql
CREATE DATABASE "test-users-db";
```

## User service

```bash
$ cd user
$ npm run build # build the image
$ kubectl create -f ./k8s/ # create all the necessary kubernetes resources
$ kubectl get pods # verify that they are running
```

### Migrate db

```bash
$ kc exec product-web-XXX-XXX -it sh
$ npm run db-migrate
$ npm run db-seed
```

## Product service

```bash
$ cd product
$ npm run build # build the image
$ kubectl create -f ./k8s/ # create all the necessary kubernetes resources
$ kubectl get pods # verify that they are running
```

### Migrate db

```bash
$ kc exec product-web-XXX-XXX -it sh
$ npm run db-migrate
$ npm run db-seed
```

## Gateway

```bash
$ cd gateway
$ npm run build # builds current image
$ kubectl create -f ../k8s/gateway-deployment.yml` # create deployment
$ kubectl get pods
NAME                      READY     STATUS    RESTARTS   AGE
gateway-XXX-XXX   0/1       Error     1          6s
```

In case of image pull error, your docker environment is not pointed to kubernetes, so kubernetes cannot pull it from
there. Try rebuilding the container from the previous step and the edit the kubernetes deployment with:
`kubectl edit gateway`

There's an ongoing application error, let's check the logs to find out what it is:

```bash
$ kubectl logs -l app=gateway
```

Deployment is created but there's something missing. As seen in the logs we need to add an environment variable. To the
deployment. This information is considered sensitive, therefore we need to use kubernetes resource called secret.

```bash
$ kubectl create secret generic gateway --from-literal=jwtSecret=my-secret # create secret
```

To use this secret as an environment variable; add this to `spec.template.spec.containers` in
`k8s/gateway-deployment.yml`
([read more here](https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/))

```sh
$ kubectl logs gateway-XXX-XXX
# create secret
$ kubectl create secret generic gateway --from-literal=jwtSecret=my-secret
```

Add this to `spec.template.spec.containers` in `k8s/gateway-deployment.yml`

```yaml
...
env:
- name: JWT_SECRET
  valueFrom:
    secretKeyRef:
      name: gateway
      key: jwtSecret
```

Expose the appliaction through a NodePort.

```sh
$ kubectl expose deployment gateway --type=NodePort --port=3000
```

Check it in your browser, this command will open a new browser session.

```sh
$ minikube service gateway
```

why? TODO

Change the service to cluster IP. Open the service in the editor.

```sh
$ kubectl edit service gateway
```

Delete the `nodePort` field from `ports` and replace the `type: NodePort` with `type: ClusterIP`


Create the ingress:

```sh
$ kubectl create -f ../k8s/ingress.yml
```

Get the ip of your cluster:

```sh
$ minikube ip
```

Open it in your browser, and you should see a greeting from within your kubernetes cluster.

## Front-end

```sh
$ cd front-end
$ npm run docker-build
```

Be patient that can take 30 minutes even.

