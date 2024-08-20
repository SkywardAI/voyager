LANGUAGE_MODEL_NAME=Phi3-mini-4k-instruct-Q4.gguf
LANGUAGE_MODEL_URL=https://huggingface.co/aisuko/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi3-mini-4k-instruct-Q4.gguf
EMBEDDING_MODEL_NAME=all-MiniLM-L6-v2-Q4_K_M-v2.gguf
EMBEDDING_MODEL_URL=https://huggingface.co/aisuko/all-MiniLM-L6-v2-gguf/resolve/main/all-MiniLM-L6-v2-Q4_K_M-v2.gguf
mkdir -p volumes/models && [ -f volumes/models/$LANGUAGE_MODEL_NAME ] || wget -O volumes/models/$LANGUAGE_MODEL_NAME $LANGUAGE_MODEL_URL
mkdir -p volumes/models && [ -f volumes/models/$EMBEDDING_MODEL_NAME ] || wget -O volumes/models/$EMBEDDING_MODEL_NAME $EMBEDDING_MODEL_URL
env $(cat .env) docker compose -f docker-compose-adv.yaml up --build -d
docker container logs -f voyager