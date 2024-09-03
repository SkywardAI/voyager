#include "setup_types.h"

#ifndef SETUP_CONFIG_H
#define SETUP_CONFIG_H

#define INFERENCE_MODEL_NAME "Phi3-mini-4k-instruct-Q4.gguf"
#define INFERENCE_MODEL_URL "https://huggingface.co/aisuko/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi3-mini-4k-instruct-Q4.gguf"
#define INFERENCE_CPU_CORES 8.00
#define INFERENCE_THREAD_COUNTS 8.00

#define EMBEDDING_CPU_CORES 4.00
#define EMBEDDING_THREAD_COUNTS 4.00

#define ALLOW_ORIGIN_NAME "*"

#define HTTPS_ENABLED 0
#define HTTPS_CERT_PATH_HOST "*"
#define HTTPS_CERT_PATH_CONTAINER "*"
#define HTTPS_CERT_NAME "cert.pem"
#define HTTPS_PRIVKEY_NAME "privkey.pem"
#define HTTPS_CA_NAME "chain.pem"
#define APP_EXPOSE_PORT "8000"

#define PLUGIN_ENABLED 0

#define SYSTEM_INSTRUCTION "*"

#define STATIC_API_KEY_ENABLED 0
#define STATIC_API_KEY "*"

#define DEFAULT_DATASET_ENABLED 0
#define DEFAULT_DATASET_NAME "production_dataset"

#define API_INDEX_DOC_ENABLED 1
#define API_INDEX_STATS_ENABLED 1
#define API_INDEX_HEALTHY_ENABLED 1
#define API_INDEX_CHATBOX_ENABLED 1
#define API_INFERENCE_COMP_ENABLED 1
#define API_INFERENCE_RAG_ENABLED 1
#define API_TOKEN_ENABLED 1
#define API_EMBEDDING_CALC_ENABLED 1
#define API_EMBEDDING_DS_ENABLED 1
#define API_VERSION_ENABLED 1

#define DEV_MODE_ENABLED 0

#define DATABASE_BIND_PATH "./lancedb"

#endif