# docker build and push to docker hub
docker build -t gcr.io/focuser-376817/client:0.2.14 -f Dockerfile.prod . &&
docker push gcr.io/focuser-376817/client:0.2.14