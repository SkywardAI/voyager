#ifndef SETUP_TYPES_H
#define SETUP_TYPES_H

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "config.h"
#include "default_config.h"

#define ESC 27

#define MESSAGE_MENU \
    "================================\n"\
    "\n"\
    "    %s\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Press Enter to Continue..."

#define INVALID_OPTION "This Option is Invalid!"

#define MENU_TEXT \
    "================================\n"\
    "\n"\
    "    Welcome to Voyager APIs!\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Config Inference Engine\n"\
    "b. Config Embedding Engine\n"\
    "c. Set Allow Origin Name\n"\
    "d. Network Related Features\n"\
    "e. Set Plugin Availability\n"\
    "f. Set System Instruction\n"\
    "g. Set Default Dataset Features\n"\
    "h. Set Database Path on Server\n"\
    "i. Set Static API-Key Features\n"\
    "j. Set APIs Availability\n"\
    "k. Toggle Developer Mode\n"\
    "l. Save & Build\n"\
    "q. Quit\n"\
    "\n"\
    "Please enter your selection: "

// ===============================INFERENCE ENGINE===============================
#define INFERENCE_ENG_MENU \
    "================================\n"\
    "\n"\
    "    Inference Engine Settings\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Set Model\n"\
    "b. Set CPU Cores\n"\
    "c. Set Thread Counts\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define INFERENCE_ENG_MODEL \
    "================================\n"\
    "\n"\
    "   Models for Inference Engine\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. (Approx 2.2GB, Slow, High Response Quality) Phi3-mini-4k-instruct-Q4.gguf\n"\
    "b. (Approx 270MB, Fast, Low Response Quality) ft-smollm-135M-instruct-on-hf-ultrafeedback-f16.gguf\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define MODEL_PHI 'a'
#define MODEL_PHI_NAME "Phi3-mini-4k-instruct-Q4.gguf"
#define MODEL_PHI_URL "https://huggingface.co/aisuko/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi3-mini-4k-instruct-Q4.gguf"

#define MODEL_SMOLLM 'b'
#define MODEL_SMOLLM_NAME "ft-smollm-135M-instruct-on-hf-ultrafeedback-f16.gguf"
#define MODEL_SMOLLM_URL "https://huggingface.co/aisuko/ft-smollm-135M-instruct-on-hf-ultrafeedback-gguf/resolve/main/ft-smollm-135M-instruct-on-hf-ultrafeedback-f16.gguf"

#define INFERENCE_ENG_CPU \
    "================================\n"\
    "\n"\
    " CPU Cores of Inference Engine\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter the number of CPU cores: "

#define INFERENCE_ENG_THREAD \
    "===================================\n"\
    "\n"\
    " Thread Counts of Inference Engine\n"\
    "\n"\
    "===================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter the number of threads: "

// ===============================EMBEDDING ENGINE===============================
#define EMBEDDING_ENG_MENU \
    "================================\n"\
    "\n"\
    "    Embedding Engine Settings\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Set CPU Cores\n"\
    "b. Set Thread Counts\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define EMBEDDING_MODEL_NAME "all-MiniLM-L6-v2-Q4_K_M-v2.gguf"
#define EMBEDDING_MODEL_URL "https://huggingface.co/aisuko/all-MiniLM-L6-v2-gguf/resolve/main/all-MiniLM-L6-v2-Q4_K_M-v2.gguf"

#define EMBEDDING_ENG_CPU \
    "================================\n"\
    "\n"\
    " CPU Cores of Embedding Engine\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter the number of CPU cores: "

#define EMBEDDING_ENG_THREAD \
    "===================================\n"\
    "\n"\
    " Thread Counts of Embedding Engine\n"\
    "\n"\
    "===================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter the number of threads: "

// ===============================ALLOW ORIGIN===============================
#define ALLOW_ORIGIN_MENU \
    "================================\n"\
    "\n"\
    "     Set Allowed Origin Name\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Max length is 100 characters.\n"\
    "Don't forget the 'https://' prefix and leave no '\\' on the end.\n"\
    "Enter 'q' to go back, or '*' to allow all origins.\n\n"\
    "Please enter the allowed origin name: "

#define ALLOW_ORIGIN_SUCCESS_MSG "Set Allow Origin Success"

// ===============================HTTPS===============================
#define HTTPS_MENU \
    "================================\n"\
    "\n"\
    "       Set Network Features\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Enable or Disable Secure Connection (https)\n"\
    "b. Set SSL/TLS Certificate Store Path\n"\
    "c. Set SSL/TLS Certificate Names\n"\
    "d. Set Application Expose Port\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define HTTPS_AVAIL \
    "================================\n"\
    "\n"\
    "    Enable or Disable Https\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Do you want to enable https features? (Y/N): "

#define HTTPS_CERT_LOC \
    "====================================\n"\
    "\n"\
    "  Set Path of SSL/TLS Certificates\n"\
    "\n"\
    "====================================\n"\
    "\n"\
    "a. Path on Host Machine\n"\
    "b. Path in Container\n"\
    "c. Path of Both\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define HTTPS_CERT_LOC_HOST \
    "================================\n"\
    "\n"\
    "      Path on Host Machine\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your path of SSL/TLS Certificate path on local machine:\n"

#define HTTPS_CERT_LOC_CONTAINER \
    "================================\n"\
    "\n"\
    "       Path in Container\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your path of SSL/TLS Certificate path in container:\n"

#define HTTPS_CERT_LOC_BOTH \
    "================================\n"\
    "\n"\
    "         Path for Both\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your path of SSL/TLS Certificate for both host machine and container:\n"

#define HTTPS_CERT_NAME_MENU \
    "====================================\n"\
    "\n"\
    "  Set Name of SSL/TLS Certificates\n"\
    "\n"\
    "====================================\n"\
    "\n"\
    "a. Name of Certificate...(default cert.pem)\n"\
    "b. Name of Private Key...(default privkey.pem)\n"\
    "c. Name of Chain.........(default chain.pem)\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define HTTPS_CERT_NAME_CERT \
    "====================================\n"\
    "\n"\
    "  Set Name of SSL/TLS Certificate\n"\
    "\n"\
    "====================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your name of SSL/TLS certificate:\n"

#define HTTPS_CERT_NAME_KEY \
    "====================================\n"\
    "\n"\
    "   Set Name of SSL/TLS Privae Key\n"\
    "\n"\
    "====================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your name of SSL/TLS private key:\n"

#define HTTPS_CERT_NAME_CA \
    "====================================\n"\
    "\n"\
    "      Set Name of SSL/TLS Chain\n"\
    "\n"\
    "====================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please enter your name of SSL/TLS chain:\n"

#define APP_OPEN_PORT_MENU \
    "================================\n"\
    "\n"\
    "         App Expose Port\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Please enter a port number.\n"\
    "String \"http\" equals \"80\" and \"https\" equals \"443\".\n"\
    "Enter 'q' to go back\n\n"\
    "Please enter your the port you want to expose: "

// ===============================PLUGIN===============================
#define PLUGIN_MENU \
    "================================\n"\
    "\n"\
    "    Enable or Disable Plugins\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Remember to write your own plugins in /tools/plugin.js\nif you want to enable it.\n\n"\
    "Enter 'q' to go back\n\n"\
    "Do you want to enable plugins? (Y/N): "

// ===============================SYSTEM INSTRUCTION===============================
#define SYSTEM_INSTRUCTION_MENU \
    "================================\n"\
    "\n"\
    "     Set System Instruction\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Set the system instruction for AI to inference, for example:\n\n"\
    "You are a helpful assistant who provide correct information to users.\n\n"\
    "Max length is 500 characters.\n"\
    "Enter 'q' to go back.\n\n"\
    "Please enter the system instruction:\n"

// ===============================STATIC API KEY===============================
#define STATIC_API_KEY_MENU \
    "================================\n"\
    "\n"\
    "    Static API Key Features\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "You can choose to set your static API key name manually in your enviromnet\n"\
    "Where the name environment variable name is STATIC_API_KEY.\n"\
    "\n"\
    "a. Enable or disable static API key\n"\
    "b. Set static API key value\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define STATIC_API_KEY_AVAIL \
    "==================================\n"\
    "\n"\
    " Enable or Disable Static API Key\n"\
    "\n"\
    "==================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Do you want to enable static API Key? (Y/N): "
    
#define STATIC_API_KEY_VALUE \
    "================================\n"\
    "\n"\
    "      Set Static API Key\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please input the value of your static API key:\n"

// ===============================DEFAULT DATASET===============================
#define DEFAULT_DATASET_MENU \
    "================================\n"\
    "\n"\
    "   Default Dataset Features\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Enable or disable default dataset\n"\
    "b. Set default dataset name\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define DEFAULT_DATASET_AVAIL \
    "===================================\n"\
    "\n"\
    " Enable or Disable Default Dataset\n"\
    "\n"\
    "===================================\n"\
    "\n"\
    "Please implement your own dataset in /tools/plugin.js if you want to enable it\n"\
    "Enter 'q' to go back\n\n"\
    "Do you want to enable load default dataset? (Y/N): "
    
#define DEFAULT_DATASET_NAME_MENU \
    "================================\n"\
    "\n"\
    "    Set Default Dataset Name\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Enter 'q' to go back\n"\
    "Please input the name of the default dataset:\n"
// ===============================APIs===============================
#define API_MENU \
    "================================\n"\
    "\n"\
    "              APIs\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Select the letter to toggle corresponding API.\n\n"

#define API_INDEX_DOC \
    "a. %s Docs.................(/)\n"

#define API_INDEX_STATS \
    "b. %s Stats................(/stats)\n"

#define API_INDEX_HEALTHY \
    "c. %s Healthy..............(/healthy)\n"

#define API_INDEX_CHATBOX \
    "d. %s Chatbox Embed........(/chatbox)\n"

#define API_INFERENCE_COMP \
    "e. %s Inference............(/v1/chat/completions)\n"

#define API_INFERENCE_RAG \
    "f. %s RAG Inference........(/v1/chat/rag-completions)\n"

#define API_TOKEN \
    "g. %s API Key..............(/v1/token/api-key)\n"

#define API_EMBEDDING_CALC \
    "h. %s Calcualte Embedding..(/v1/embeddings)\n"

#define API_EMBEDDING_DS \
    "i. %s Upload Dataset.......(/v1/embeddings/dataset)\n"

#define API_VERSION \
    "j. %s Version..............(/v1/version)\n"

#define API_MENU_END \
    "y. Enable All\n"\
    "z. Disable All\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define ENABLED  " (Enabled)"
#define DISABLED "(Disabled)"

// ===============================DEV MODE===============================
#define DEV_MODE_MENU \
    "================================\n"\
    "\n"\
    "        Developer Mode\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "The developer mode can auto restart your server if you changed any file.\n"\
    "This requires you installed dependencies in 'package.json',\notherwise the server will fail to start.\n\n"\
    "You can choose to save settings from 'Save & Build' menu \nand install use your prefer package manager.\n\n"\
    "Enter 'q' to go back\n\n"\
    "Do you want to enable developer mode? (Y/N): "

// ===============================DEV MODE===============================
#define DATABSE_PATH_MENU \
    "================================\n"\
    "\n"\
    "     Database Path on Server\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "Please set your database path on server, so you won't lost your data when you restart your server.\n"\
    "Enter 'q' to go back\n\n"\
    "Path of database: "

// ===============================CONFIGS===============================
#define SAVE_CONFIG_SUCCESS "Successfully Saved Config"

#define SAVE_AND_BUILD_MENU \
    "================================\n"\
    "\n"\
    "      Save And Build Server\n"\
    "\n"\
    "================================\n"\
    "\n"\
    "a. Only save configs\n"\
    "b. Load default configs\n"\
    "c. Build and start the server\n"\
    "q. Go back\n"\
    "\n"\
    "Please enter your selection: "

#define CONFIG_H_FILE \
"#include \"setup_types.h\"\n"\
"\n"\
"#ifndef SETUP_CONFIG_H\n"\
"#define SETUP_CONFIG_H\n"\
"\n"\
"#define INFERENCE_MODEL_NAME \"%s\"\n"\
"#define INFERENCE_MODEL_URL \"%s\"\n"\
"#define INFERENCE_CPU_CORES %.2f\n"\
"#define INFERENCE_THREAD_COUNTS %.2f\n"\
"\n"\
"#define EMBEDDING_CPU_CORES %.2f\n"\
"#define EMBEDDING_THREAD_COUNTS %.2f\n"\
"\n"\
"#define ALLOW_ORIGIN_NAME \"%s\"\n"\
"\n"\
"#define HTTPS_ENABLED %d\n"\
"#define HTTPS_CERT_PATH_HOST \"%s\"\n"\
"#define HTTPS_CERT_PATH_CONTAINER \"%s\"\n"\
"#define HTTPS_CERT_NAME \"%s\"\n"\
"#define HTTPS_PRIVKEY_NAME \"%s\"\n"\
"#define HTTPS_CA_NAME \"%s\"\n"\
"#define APP_EXPOSE_PORT \"%s\"\n"\
"\n"\
"#define PLUGIN_ENABLED %d\n"\
"\n"\
"#define SYSTEM_INSTRUCTION \"%s\"\n"\
"\n"\
"#define STATIC_API_KEY_ENABLED %d\n"\
"#define STATIC_API_KEY \"%s\"\n"\
"\n"\
"#define DEFAULT_DATASET_ENABLED %d\n"\
"#define DEFAULT_DATASET_NAME \"%s\"\n"\
"\n"\
"#define API_INDEX_DOC_ENABLED %d\n"\
"#define API_INDEX_STATS_ENABLED %d\n"\
"#define API_INDEX_HEALTHY_ENABLED %d\n"\
"#define API_INDEX_CHATBOX_ENABLED %d\n"\
"#define API_INFERENCE_COMP_ENABLED %d\n"\
"#define API_INFERENCE_RAG_ENABLED %d\n"\
"#define API_TOKEN_ENABLED %d\n"\
"#define API_EMBEDDING_CALC_ENABLED %d\n"\
"#define API_EMBEDDING_DS_ENABLED %d\n"\
"#define API_VERSION_ENABLED %d\n"\
"\n"\
"#define DEV_MODE_ENABLED %d\n"\
"\n"\
"#define DATABASE_BIND_PATH \"%s\"\n"\
"\n"\
"#endif"

#define DOCKER_COMPOSE_FILE \
"services:\n"\
"  llamacpp:\n"\
"    container_name: ${INFERENCE_ENG}\n"\
"    image: gclub/llama.cpp:${INFERENCE_ENG_VERSION}\n"\
"    restart: always\n"\
"    deploy:\n"\
"      resources:\n"\
"        reservations:\n"\
"          cpus: \"${NUM_CPU_CORES}\"\n"\
"    volumes:\n"\
"      - \"${DOCKER_VOLUME_DIRECTORY:-.}/${MODEL_SAVE_PATH}:/models\"\n"\
"    expose:\n"\
"      - ${ENG_ACCESS_PORT}\n"\
"    ports:\n"\
"      - ${INFERENCE_ENG_PORT}:${ENG_ACCESS_PORT}\n"\
"    command: [\"-m\", \"models/${LANGUAGE_MODEL_NAME}\",\"-t\",\"${NUM_THREADS_COUNT}\",\"-c\",\"8192\"]\n"\
"\n"\
"  embedding_eng:\n"\
"    container_name: ${EMBEDDING_ENG}\n"\
"    image: gclub/llama.cpp:${INFERENCE_ENG_VERSION}\n"\
"    restart: always\n"\
"    deploy:\n"\
"      resources:\n"\
"        reservations:\n"\
"          cpus: \"${NUM_CPU_CORES_EMBEDDING}\"\n"\
"    volumes:\n"\
"      - \"${DOCKER_VOLUME_DIRECTORY:-.}/${MODEL_SAVE_PATH}:/models\"\n"\
"    expose:\n"\
"      - ${ENG_ACCESS_PORT}\n"\
"    ports:\n"\
"      - ${EMBEDDING_ENG_PORT}:${ENG_ACCESS_PORT}\n"\
"    command: [\"-m\", \"models/${EMBEDDING_MODEL_NAME}\",\"--embeddings\",\"--pooling\",\"mean\",\"-t\",\"${NUM_THREAD_COUNTS_EMBEDDING}\",\"-c\",\"512\"]\n"\
"\n"\
"  voyager:\n"\
"    container_name: voyager\n"\
"    restart: always\n"\
"    build:\n"\
"      dockerfile: setup/Dockerfile\n"\
"      context: .\n"\
"%s"\
"    volumes:\n"\
"      - ${DATABASE_BIND_PATH}:/tmp/lancedb\n"\
"%s%s"\
"    expose:\n"\
"      - ${APP_EXPOSE_PORT}\n"\
"    ports:\n"\
"      - ${APP_EXPOSE_PORT}:${APP_PORT}\n"\
"    depends_on:\n"\
"      - llamacpp\n"\
"      - embedding_eng\n"\

#define COMPOSE_FILE_DEV_MODE "      - .:/app\n"
#define COMPOSE_FILE_STATIC_API_KEY \
"    environment:\n"\
"      - STATIC_API_KEY=%s\n"
#define COMPOSE_FILE_SSL_INFO \
"      - %s/%s:%s/%s\n"\
"      - %s/%s:%s/%s\n"\
"      - %s/%s:%s/%s\n"


#define ENV_FILE \
"APP_PORT=8000\n"\
"APP_EXPOSE_PORT=%s\n"\
"ENG_ACCESS_PORT=8080\n"\
"MODEL_SAVE_PATH=volumes/models\n"\
"DATABASE_BIND_PATH=%s\n"\
"INFERENCE_ENG=llamacpp\n"\
"INFERENCE_ENG_PORT=8080\n"\
"INFERENCE_ENG_VERSION=server--b1-27d4b7c\n"\
"NUM_CPU_CORES=%.2f\n"\
"NUM_THREADS_COUNT=%.2f\n"\
"EMBEDDING_ENG=embedding_eng\n"\
"EMBEDDING_ENG_PORT=8081\n"\
"NUM_CPU_CORES_EMBEDDING=%.2f\n"\
"NUM_THREAD_COUNTS_EMBEDDING=%.2f\n"\
"LANGUAGE_MODEL_NAME=%s\n"\
"EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2-Q4_K_M-v2.gguf\n"\

#define ENV_PRODUCTION_FILE \
"ALLOW_ORIGIN=\"%s\"\n"\
"STATIC_API_KEY_ENABLED=%d\n"\
"ENABLE_PLUGIN=%d\n"\
"ENABLE_HTTPS=%d\n"\
"HTTPS_KEY_PATH=\"%s/%s\"\n"\
"HTTPS_CERT_PATH=\"%s/%s\"\n"\
"HTTPS_CA_PATH=\"%s/%s\"\n"\
"SYSTEM_INSTRUCTION=\"%s\"\n"\
"LOAD_DEFAULT_DATASET=%d\n"\
"DEFAULT_DATASET_NAME=\"%s\"\n"\
"AVAILABLE_APIS=\"%s\""

#define AVAILABLE_APIS_FORMAT "%d%d%d%d.%d%d.%d.%d%d.%d"

#define DOCKERFILE  \
"FROM node:20.15.1-slim\n"\
"WORKDIR /app\n"\
"COPY . .\n"\
"\n"\
"%s"\
"%s"\
"%s"\

#define DOCKERFILE_ENABLE_HEALTHY_CHECK \
"HEALTHCHECK --interval=300s --timeout=30s --start-period=5s --retries=3 CMD [ \"node\", \"healthy-check.js\" ]\n"

#define DOCKERFILE_DEV_COMMAND \
"RUN npm install -g nodemon\n"

#define DOCKERFILE_PROD_COMMAND \
"RUN npm install -g pnpm && pnpm install\n"

#define DOCKERFILE_DEV_ENTRYPOINT \
"ENTRYPOINT [ \"npm\", \"run\", \"dev\" ]"

#define DOCKERFILE_PROD_ENTRYPOINT \
"ENTRYPOINT [ \"npm\", \"start\" ]"

#define SHELL_FILE \
"LANGUAGE_MODEL_NAME=%s\n"\
"LANGUAGE_MODEL_URL=%s\n"\
"EMBEDDING_MODEL_NAME=%s\n"\
"EMBEDDING_MODEL_URL=%s\n"\
"mkdir -p volumes/models && [ -f volumes/models/$LANGUAGE_MODEL_NAME ] || wget -O volumes/models/$LANGUAGE_MODEL_NAME $LANGUAGE_MODEL_URL\n"\
"mkdir -p volumes/models && [ -f volumes/models/$EMBEDDING_MODEL_NAME ] || wget -O volumes/models/$EMBEDDING_MODEL_NAME $EMBEDDING_MODEL_URL\n"\
"env $(cat .env) docker compose -f docker-compose-adv.yaml up --build -d\n"\
"docker container logs -f voyager"

#endif