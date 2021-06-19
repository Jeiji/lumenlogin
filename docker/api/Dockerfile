FROM php:fpm-alpine3.13

RUN apk update && apk add postgresql-dev
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pgsql pdo_pgsql