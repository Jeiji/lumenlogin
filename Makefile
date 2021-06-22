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

.PHONY: set-env
set-env:
ifeq (,$(wildcard ./my-app/.env))
	sed 's/mysql/pgsql/g;s/127.0.0.1/postgres/g;s/3306/5434/g;s/homestead/my_app/g;s/homestead/postgres/g;s/secret/mysecretpassword/g;s/QUEUE_CONNECTION=sync/QUEUE_CONNECTION=sync\n\nJWT_SECRET=40ZoX3xUOF1473yaRrxm3lkG1eAtpSdWD16CmY2Na6wkfEzNZokMn1FzqkQ1YlIu/g' ./my-app/.env.example > ./my-app/.env
endif

# install-frontend:
# 	pushd frontend && \
# 		yarn install && \
# 	popd

# serve-frontend: install-frontend
# 	pushd frontend && \
# 		yarn start && \
# 	popd