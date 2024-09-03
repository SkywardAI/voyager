# project related
PROJECT_NAME:=voyager
CONTAINER_NAME:=voyager:v0.2.0
APP_PORT:=8000
APP_EXPOSE_PORT:=8000
# compose build related
ENV_FILE:=.env

ENG_ACCESS_PORT:=8080
MODEL_SAVE_PATH:=volumes/models
DATABASE_BIND_PATH:=./lancedb

INFERENCE_ENG:=llamacpp
INFERENCE_ENG_PORT:=8080
INFERENCE_ENG_VERSION:=server--b1-27d4b7c
NUM_CPU_CORES:=8.00
NUM_THREADS_COUNT:=8.00

EMBEDDING_ENG:=embedding_eng
EMBEDDING_ENG_PORT:=8081
NUM_CPU_CORES_EMBEDDING:=4.00
NUM_THREAD_COUNTS_EMBEDDING:=4.00
LANGUAGE_MODEL_NAME:=ft-smollm-135M-instruct-on-hf-ultrafeedback-f16.gguf
LANGUAGE_MODEL_URL:=https://huggingface.co/aisuko/ft-smollm-135M-instruct-on-hf-ultrafeedback-gguf/resolve/main/ft-smollm-135M-instruct-on-hf-ultrafeedback-f16.gguf
EMBEDDING_MODEL_NAME:=all-MiniLM-L6-v2-Q4_K_M-v2.gguf
EMBEDDING_MODEL_URL:=https://huggingface.co/aisuko/all-MiniLM-L6-v2-gguf/resolve/main/all-MiniLM-L6-v2-Q4_K_M-v2.gguf?download=true

# build and run this service only
.PHONY: build
build:
	@docker build -t $(CONTAINER_NAME) .

.PHONY: run
run: build
	@docker run --rm -p $(PORT):$(PORT) --name $(PROJECT_NAME) $(CONTAINER_NAME)

# compose build with llamacpp
.PHONY: env
env:
	@echo "APP_PORT=$(APP_PORT)"> $(ENV_FILE)
	@echo "APP_EXPOSE_PORT=$(APP_EXPOSE_PORT)">> $(ENV_FILE)
	@echo "ENG_ACCESS_PORT=$(ENG_ACCESS_PORT)">> $(ENV_FILE)
	@echo "MODEL_SAVE_PATH=$(MODEL_SAVE_PATH)">> $(ENV_FILE)
	@echo "DATABASE_BIND_PATH=$(DATABASE_BIND_PATH)">> $(ENV_FILE)
	@echo "INFERENCE_ENG=$(INFERENCE_ENG)">> $(ENV_FILE)
	@echo "INFERENCE_ENG_PORT=$(INFERENCE_ENG_PORT)">> $(ENV_FILE)
	@echo "INFERENCE_ENG_VERSION=$(INFERENCE_ENG_VERSION)">> $(ENV_FILE)
	@echo "NUM_CPU_CORES=$(NUM_CPU_CORES)">> $(ENV_FILE)
	@echo "NUM_THREADS_COUNT=$(NUM_THREADS_COUNT)">> $(ENV_FILE)
	@echo "EMBEDDING_ENG=$(EMBEDDING_ENG)">> $(ENV_FILE)
	@echo "EMBEDDING_ENG_PORT=$(EMBEDDING_ENG_PORT)">> $(ENV_FILE)
	@echo "NUM_CPU_CORES_EMBEDDING=$(NUM_CPU_CORES_EMBEDDING)">> $(ENV_FILE)
	@echo "NUM_THREAD_COUNTS_EMBEDDING=$(NUM_THREAD_COUNTS_EMBEDDING)">> $(ENV_FILE)
	@echo "LANGUAGE_MODEL_NAME=$(LANGUAGE_MODEL_NAME)">> $(ENV_FILE)
	@echo "EMBEDDING_MODEL_NAME=$(EMBEDDING_MODEL_NAME)">> $(ENV_FILE)

.PHONY: model-prepare
model-prepare:
	@mkdir -p $(MODEL_SAVE_PATH) && [ -f $(MODEL_SAVE_PATH)/$(LANGUAGE_MODEL_NAME) ] || wget -O $(MODEL_SAVE_PATH)/$(LANGUAGE_MODEL_NAME) $(LANGUAGE_MODEL_URL)
	@mkdir -p $(MODEL_SAVE_PATH) && [ -f $(MODEL_SAVE_PATH)/$(EMBEDDING_MODEL_NAME) ] || wget -O $(MODEL_SAVE_PATH)/$(EMBEDDING_MODEL_NAME) $(EMBEDDING_MODEL_URL)

#  normal build & up
.PHONY: compose-build
compose-build: env model-prepare
	@docker compose -f docker-compose.yaml build

.PHONY: up
up: compose-build
	@docker compose -f docker-compose.yaml up -d

#  dev build & up
.PHONY: compose-build-dev
compose-build-dev: env model-prepare
	@docker compose -f docker-compose-dev.yaml build

.PHONY: dev
dev: compose-build-dev
	@docker compose -f docker-compose-dev.yaml up -d

# stop
.PHONY: stop
stop:
	docker compose stop

#########################################################################################
# testing

.PHONY: pytest
pytest:
	@python3 -m pytest -v

#########################################################################################
# setup

.PHONY: setup
setup:
	gcc setup/setup.c -o setup/setup
	setup/setup