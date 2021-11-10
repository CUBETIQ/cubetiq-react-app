#!/bin/sh -e

echo "Building docker image..."
docker build . -t myreactapp:latest

echo "Running docker image..."
docker run --cpus=".1" --memory="5m" --rm -it -p 3003:3000 myreactapp:latest

# Now you can access the app at http://localhost:3003