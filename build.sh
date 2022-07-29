#! /bin/bash
go build main.go
GOOS=windows GOARCH=amd64 go build main.go
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main-linux main.go


