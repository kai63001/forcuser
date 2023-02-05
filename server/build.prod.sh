# docker build and push to docker hub
docker build -t gcr.io/focuser-376817/server:0.1 -f Dockerfile.prod . &&
docker push gcr.io/focuser-376817/server:0.1