SHELL := /bin/bash
COMPOSE := docker-compose -f docker/docker-compose.yaml -p lumen

.PHONY: composer
composer:
	docker run --rm --interactive --tty --volume "${PWD}/my-app:/app" composer $(ARGS)

.PHONY: install
install:
	$(MAKE) composer ARGS="install"

.PHONY: cpenv
cpenv: 
ifeq (,$(wildcard ./my-app/.env))
	cp ./my-app/.env.example ./my-app/.env
endif

.PHONY: dev
dev: install
	$(COMPOSE) up $(ARGS)

.PHONY: cpenv
cpenv:
ifeq (,$(wildcard ./my-app/.env))
	cp ./my-app/.env.example ./my-app/.env
endif

install-frontend:
	pushd frontend && \
		yarn install && \
	popd

serve-frontend: install-frontend
	pushd frontend && \
		yarn start && \
	popd