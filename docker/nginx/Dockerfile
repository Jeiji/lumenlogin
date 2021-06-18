FROM nginx:latest

RUN echo 'we are running some # of cool things'

RUN apt-get update \
  && apt-get install openssh-client curl dnsmasq -y

COPY nginx.conf /etc/nginx/nginx.conf

