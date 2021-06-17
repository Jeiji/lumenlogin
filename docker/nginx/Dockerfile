FROM nginx:latest

RUN apt-get update \
  && apt-get install openssh-client curl dnsmasq -y

COPY nginx.conf /etc/nginx/nginx.conf
