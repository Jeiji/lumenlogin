SHELL := /bin/bash
COMPOSE := docker-compose -f docker/docker-compose.yaml -p lumen

.PHONY: composer
composer:
	docker run --rm -it --volume "${PWD}/my-app:/app" composer ${ARGS}

.PHONY: install
install:
	$(MAKE) composer ARGS="install"

.PHONY: dev
dev: install
	$(COMPOSE) up $(ARGS)

set-env:
ifeq (,$(wildcard ./my-app/.env))
	cp ./my-app/.env.example ./my-app/.env
endif
	$(MAKE) dev ARGS="-d"
	docker exec -t lumen_api_1 sh -c "php artisan migrate; php artisan db:seed --class='UserSeeder'"