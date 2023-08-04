FROM node:18.14.2-alpine3.17
ENV TZ=America/Santiago
RUN apk update && apk upgrade && \
  apk add tzdata

# home directory
WORKDIR /home/app

# node packages
COPY package.json ./
RUN npm install 

# copy app
COPY . .