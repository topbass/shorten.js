repo := waltzofpearls/shorten.js
name := shorten.js

# Docker related Makefile targets
.PHONY: build run run-development run-testing stop status purge
build:
	docker build -t $(repo) .

run:
	docker run -p 49002:3000 -d -e NODE_ENV=production --name $(name) $(repo)

run-development:
	docker run -p 49002:3000 -d -e NODE_ENV=development --name $(name) $(repo)

run-testing:
	docker run -p 49002:3000 -d -e NODE_ENV=testing --name $(name) $(repo)

stop:
	docker ps -a | grep $(name) > /dev/null \
	&& docker stop $(name) && docker rm $(name) \
	|| echo "\nDocker container [$(name)] does not exist."

status:
	docker ps -a -f name=$(name)

purge:
	docker images | grep $(repo) > /dev/null \
	&& docker rmi $(repo) \
	|| echo "\nDocker image [$(repo)] does not exist."

# Docker hub related Makefile targets
.PHONY: push pull
push:
	docker push $(repo)

pull:
	docker pull $(repo)

# Node and npm related Makefile targets
.PHONY: install test clean
install:
	@. ~/.nvm/nvm.sh && \
	nvm use 0.11 && \
	npm install

test:
	@. ~/.nvm/nvm.sh && \
	nvm use 0.11 && \
	npm test

clean:
	@rm -rf node_modules

# Deployment
.PHONY: release
release: clean install test build push