FROM node:15.4-alpine3.11

RUN apk update && \
    apk add build-base yarn curl alpine-sdk bash

CMD [ "make", "serve-frontend" ]