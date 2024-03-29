# Build application
FROM cubetiq/calpine-node AS builder

RUN apk update && \
    # For build commit hash in "process.env.COMMIT_ID"
    apk add git && \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Phnom_Penh /etc/localtime && \
    echo "Asia/Phnom_Penh" > /etc/timezone

WORKDIR /app
COPY package.json ./
# Set custom registry for npm registry (from cubetiq local server)
RUN yarn config set registry https://r.ctdn.net
RUN yarn
COPY . .
RUN yarn build

# Clean up unused packages
RUN apk del tzdata && \
    apk del git

# Build production image
FROM nginx:alpine
LABEL maintainer="sombochea@cubetiqs.com"

WORKDIR  /usr/share/nginx/html
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80