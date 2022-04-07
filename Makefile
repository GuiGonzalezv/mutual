ARGS=api
API_DEV=docker-compose -f docker-compose.dev.yml
API=docker-compose -f docker-compose.yml


stop:
	docker stop $$(docker ps -q) || true

remove-containers: stop
	$(API) rm -f $$ARGS

build:
	$(API) build

build-dev:
	$(API_DEV) build

up:
	$(API) up --remove-orphans -d $$ARGS

up-dev: 
	$(API_DEV) up -d --remove-orphans $$ARGS

restart:
	$(API) restart $(ARGS)

watch:
	$(API) logs -f --tail=100 $(ARGS)

test:
	$(API_DEV) exec api yarn test

