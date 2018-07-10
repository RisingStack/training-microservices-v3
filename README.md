j Microservice Training

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

Before you begin, stop all docker daemon processes on your local machine to avoid collision. We are going to use a VirtualBox virtual
machine to run docker.

Running databases inside of the "cluster" is not part of the current training session. To emulate hosted database
environments we created a docker-comopse script that runs a postgresql database on the minikube machine but outside of
kubernetes.

Easy mode:

```sh
./scripts/up
```

If you encounter any problems: follow the guide below.

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

## Product service

```bash
$ cd product
$ npm run build # build the image
$ kubectl create -f ./k8s/ # create all the necessary kubernetes resources
$ kubectl get pods # verify that they are running
```

### Migrate db

```bash
./scripts/migrate
```

## Front-end

```bash
$ cd front-end
$ npm run docker-build
```

Be patient that can take 30 minutes even.

## Gateway

```bash
$ cd gateway
$ npm run build # builds current image
$ kubectl create -f ./k8s/`
```

In case of image pull error, your docker environment is not pointed to kubernetes, so kubernetes cannot pull it from
there. Try rebuilding the container from the previous step and the edit the kubernetes deployment with:
`kubectl edit gateway`
