#! /bin/bash
go build -trimpath -ldflags="-s -w" main.go
GOOS=windows GOARCH=amd64 go build -trimpath -ldflags="-s -w" main.go
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o main-linux main.go