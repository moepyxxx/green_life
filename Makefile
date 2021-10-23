PACKAGE=
install:
# docker-compose run --rm node npm install create-next-app front
	docker compose run -w /usr/src/app/front --rm node npm install $(PACKAGE)

run:
	docker compose up

build:
	docker compose run -w /usr/src/app/front --rm node npm install