PROJECT_NAME:=voyager
CONTAINER_NAME:=voyager:v0.1.0
PORT:=8000


.PHONY: build
build:
	@docker build -t $(CONTAINER_NAME) .

.PHONY: run
run: build
	@docker run --rm -p $(PORT):$(PORT) --name $(PROJECT_NAME) $(CONTAINER_NAME)