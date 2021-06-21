# FROM php:fpm-alpine3.13
FROM php:7.4.20-fpm-alpine

RUN apk update && apk add postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql