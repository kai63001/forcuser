FROM golang:1.19.2

ENV PROJECT_DIR=/app \
    GO111MODULE=on
    # CGO_ENABLED=0

WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y libvips libvips-dev
RUN go get github.com/githubnemo/CompileDaemon
RUN go install github.com/githubnemo/CompileDaemon
EXPOSE 4000
ENTRYPOINT CompileDaemon --build="go build main.go" --command="./main" -polling=true -polling-interval=100