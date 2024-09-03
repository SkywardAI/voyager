#include "setup_types.h"

// ===============================VARS===============================
char* inference_model_name = INFERENCE_MODEL_NAME;
char* inference_model_url = INFERENCE_MODEL_URL;
float inference_cpu_cores = INFERENCE_CPU_CORES;
float inference_thread_counts = INFERENCE_THREAD_COUNTS;
float embedding_cpu_cores = EMBEDDING_CPU_CORES;
float embedding_thread_counts = EMBEDDING_THREAD_COUNTS;

char* allow_origin_name = ALLOW_ORIGIN_NAME;

int https_enabled = HTTPS_ENABLED;
char* https_cert_path_host = HTTPS_CERT_PATH_HOST;
char* https_cert_path_container = HTTPS_CERT_PATH_CONTAINER;
char* https_cert_name = HTTPS_CERT_NAME;
char* https_privkey_name = HTTPS_PRIVKEY_NAME;
char* https_ca_name = HTTPS_CA_NAME;
char* app_expose_port = APP_EXPOSE_PORT;

int plugin_enabled = PLUGIN_ENABLED;

char* system_instruction = SYSTEM_INSTRUCTION;

int static_api_key_enabled = STATIC_API_KEY_ENABLED;
char* static_api_key_value = STATIC_API_KEY;

int default_dataset_enabled = DEFAULT_DATASET_ENABLED;
char* default_dataset_name = DEFAULT_DATASET_NAME;

int api_index_doc_enabled = API_INDEX_DOC_ENABLED;
int api_index_stats_enabled = API_INDEX_STATS_ENABLED;
int api_index_healthy_enabled = API_INDEX_HEALTHY_ENABLED;
int api_index_chatbox_enabled = API_INDEX_CHATBOX_ENABLED;
int api_inference_comp_enabled = API_INFERENCE_COMP_ENABLED;
int api_inference_rag_enabled = API_INFERENCE_RAG_ENABLED;
int api_token_enabled = API_TOKEN_ENABLED;
int api_embedding_calc_enabled = API_EMBEDDING_CALC_ENABLED;
int api_embedding_ds_enabled = API_EMBEDDING_DS_ENABLED;
int api_version_enabled = API_VERSION_ENABLED;

int dev_mode_enabled = DEV_MODE_ENABLED;

char* database_bind_path = DATABASE_BIND_PATH;

// ===============================FUNCTION DECLARATION===============================

void logMenu(char*);
void logMessage(char*);
void handleMenuSelection();
char getSelectedOption();

void setNumberFields(char*, char*, char*, char*, int, int, float*);
void setStringFields(char*, char*, char*, char**);
void setStringFieldsWithLength(char*, char*, char*, char**, int);
void setYesNoFields(char*, int*);


void engineCPUSettings(char*, float*);
void engineThreadSettings(char*, float*);

void inferenceEngineSettings();
void inferenceEngineModelSettings();
void embeddingEngineSettings();

void httpsSettings();
void httpsCertPathSettings();
void httpsCertNameSettings();

void staticAPIKeySettings();

void defaultDatasetSettings();

void logAPIMenu();
void apiSettings();

void buildSettings();
void saveSettings(int);
void saveDefaultSettings();

// ===============================MAIN===============================
int main() {
    while (1) {
        logMenu(MENU_TEXT);
        handleMenuSelection();
    }
    return 0;
}

// ===============================MAIN MENU===============================
void logMenu(char* menu) {
    fflush(stdout);
    system("clear");
    printf("%s", menu);
}

void logMessage(char* message) {
    printf(MESSAGE_MENU, message);
    char s[10];
    fgets(s, 10, stdin);
}

void handleMenuSelection() {
    switch (getSelectedOption()) {
        case 'a': case 'A':
            inferenceEngineSettings(); break;
        case 'b': case 'B':
            embeddingEngineSettings(); break;
        case 'c': case 'C':
            setStringFields(
                ALLOW_ORIGIN_MENU,
                ALLOW_ORIGIN_SUCCESS_MSG,
                "Allowed Origin Name:",
                &allow_origin_name
            ); break;
        case 'd': case 'D':
            httpsSettings();
            break;
        case 'e': case 'E':
            setYesNoFields(PLUGIN_MENU, &plugin_enabled);
            break;
        case 'f': case 'F':
            setStringFieldsWithLength(
                SYSTEM_INSTRUCTION_MENU,
                "Set System Instruction",
                "System instruction:",
                &system_instruction, 500
            ); break;
        case 'g': case 'G':
            defaultDatasetSettings();
            break;
        case 'h': case 'H':
            setStringFields(
                DATABSE_PATH_MENU, 
                "Set Database Path Success", 
                "Database path: ",
                &database_bind_path
            );
            break;
        case 'i': case 'I':
            staticAPIKeySettings();
            break;
        case 'j': case 'J':
            apiSettings();
        case 'k': case 'K':
            setYesNoFields(DEV_MODE_MENU, &dev_mode_enabled); break;
        case 'l': case 'L':
            buildSettings(); break;
        case 'q': case 'Q': case ESC:
            puts("Exit.");
            exit(0);
        case '\n': break;
        default: logMessage(INVALID_OPTION); break;
    }
}

char getSelectedOption() {
    char selection[10];
    fgets(selection, 10, stdin);
    return selection[0];
}

void setNumberFields(
    char* log_message, char* selected_message, 
    char* success_message, char* failed_message, 
    int min, int max,
    float* var_to_set
) {
    while (1) {
        logMenu(log_message);
        char number[10];
        fgets(number, 10, stdin);
        if(number[0] == 'q') return;

        float num = atof(number);
        printf("\n%.2f %s\n\n", num, selected_message);
        if(num <= min || (max >= 0 && num >= max)) {
            logMessage(failed_message);
        } else {
            logMessage(success_message);
            *var_to_set = num;
            return;
        }
    }
}

void setStringFieldsWithLength(
    char* menu_text, char* success_message, 
    char* set_message, char** string_to_change,
    int max_length
) {
    logMenu(menu_text);
    char name[max_length];
    fgets(name, max_length, stdin);
    if(strcmp(name, "q\n") == 0) return;

    int len = strlen(name);
    name[len - 1] = '\0';
    asprintf(string_to_change, "%s", (char*)name);
    
    printf("\n%s %s\n\n", set_message, *string_to_change);
    logMessage(success_message);
}

void setStringFields(
    char* menu_text, char* success_message, 
    char* set_message, char** string_to_change
) {
    setStringFieldsWithLength(
        menu_text, success_message,
        set_message, string_to_change,
        100
    );
}

void setYesNoFields(char* menu_text, int* int_to_set) {
    while(1) {
        logMenu(menu_text);
        switch(getSelectedOption()) {
            case 'y': case 'Y':
                *int_to_set = 1;
                return;
            case 'n': case 'N':
                *int_to_set = 0;
                return;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

// ===============================SUB MENUS===============================

// ===============================Llama.cpp Engines===============================
void engineCPUSettings(char* menu_message, float* var_to_set) {
    setNumberFields(
        menu_message,
        "Cores Selected.",
        "Set CPU cores Success.",
        "CPU cores is invalid!",
        0, -1, var_to_set
    );
}

void engineThreadSettings(char* menu_message, float* var_to_set) {
    setNumberFields(
        menu_message,
        "Threads Selected.",
        "Set Thread num Success.",
        "Thread num is invalid!",
        0, -1, var_to_set
    );
}

// ===============================INFERENCE===============================
void inferenceEngineSettings() {
    while (1) {
        logMenu(INFERENCE_ENG_MENU);
        switch (getSelectedOption()) {
            case 'a': case 'A':
                inferenceEngineModelSettings();
                break;
            case 'b': case 'B':
                engineCPUSettings(INFERENCE_ENG_CPU, &inference_cpu_cores);
                break;
            case 'c': case 'C':
                engineThreadSettings(INFERENCE_ENG_THREAD, &inference_thread_counts);
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
    
}

void inferenceEngineModelSettings() {
    while (1) {
        logMenu(INFERENCE_ENG_MODEL);
        switch (getSelectedOption()) {
            case MODEL_PHI: 
                inference_model_name = MODEL_PHI_NAME;
                inference_model_url = MODEL_PHI_URL;
                logMessage("Selected Model Phi3");
                return;
            case MODEL_SMOLLM:
                inference_model_name = MODEL_SMOLLM_NAME;
                inference_model_url = MODEL_SMOLLM_URL;
                logMessage("Selected Model Smollm");
                return;
            case 'q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

// ===============================EMBEDDING===============================
void embeddingEngineSettings() {
    while (1) {
        logMenu(EMBEDDING_ENG_MENU);
        switch (getSelectedOption()) {
            case 'a': case 'A':
                engineCPUSettings(EMBEDDING_ENG_CPU, &embedding_cpu_cores);
                break;
            case 'b': case 'B':
                engineThreadSettings(EMBEDDING_ENG_THREAD, &embedding_thread_counts);
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}
// ===============================HTTPS===============================
void httpsSettings() {
    while(1) {
        logMenu(HTTPS_MENU);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                setYesNoFields(HTTPS_AVAIL, &https_enabled);
                break;
            case 'b': case 'B':
                httpsCertPathSettings();
                break;
            case 'c': case 'C':
                httpsCertNameSettings();
                break;
            case 'd': case 'D':
                setStringFields(
                    APP_OPEN_PORT_MENU,
                    "Set Expose Port Success",
                    "Expose port:",
                    &app_expose_port
                );
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

void httpsCertPathSettings() {
    while(1) {
        logMenu(HTTPS_CERT_LOC);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                setStringFields(
                    HTTPS_CERT_LOC_HOST,
                    "Successfully Set Location",
                    "Path on host machine:",
                    &https_cert_path_host
                );
                break;
            case 'b': case 'B':
                setStringFields(
                    HTTPS_CERT_LOC_CONTAINER,
                    "Successfully Set Location",
                    "Path in container:",
                    &https_cert_path_container
                );
                break;
            case 'c': case 'C':
                setStringFields(
                    HTTPS_CERT_LOC_CONTAINER,
                    "Successfully Set Location",
                    "Path on both:",
                    &https_cert_path_container
                );
                asprintf(&https_cert_path_host, "%s", https_cert_path_container);
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

void httpsCertNameSettings() {
    while(1) {
        logMenu(HTTPS_CERT_NAME_MENU);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                setStringFields(
                    HTTPS_CERT_NAME_CERT,
                    "Set CERT Name Success",
                    "SSL/TSL certificate name:",
                    &https_cert_name
                );
                break;
            case 'b': case 'B':
                setStringFields(
                    HTTPS_CERT_NAME_KEY,
                    "Set PRIVKEY Name Success",
                    "SSL/TSL private key name:",
                    &https_privkey_name
                );
                break;
            case 'c': case 'C':
                setStringFields(
                    HTTPS_CERT_NAME_CA,
                    "Set Chain Name Success",
                    "SSL/TSL chain name:",
                    &https_ca_name
                );
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

// ===============================STATIC API KEY===============================
void staticAPIKeySettings() {
    while(1) {
        logMenu(STATIC_API_KEY_MENU);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                setYesNoFields(STATIC_API_KEY_AVAIL, &static_api_key_enabled);
                break;
            case 'b': case 'B':
                setStringFields(
                    STATIC_API_KEY_VALUE,
                    "Set Static API Key Success",
                    "Your static API key:",
                    &static_api_key_value
                );
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}
// ===============================DEFAULT DATASET===============================
void defaultDatasetSettings() {
    while(1) {
        logMenu(DEFAULT_DATASET_MENU);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                setYesNoFields(DEFAULT_DATASET_AVAIL, &default_dataset_enabled);
                break;
            case 'b': case 'B':
                setStringFields(
                    DEFAULT_DATASET_NAME_MENU,
                    "Set Default Dataset Name",
                    "Your default dataset name:",
                    &default_dataset_name
                );
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

// ===============================API===============================
void logAPIMenu() {
    fflush(stdout);
    system("clear");
    printf("%s", API_MENU);
    printf(API_INDEX_DOC, api_index_doc_enabled?ENABLED:DISABLED);
    printf(API_INDEX_STATS, api_index_stats_enabled?ENABLED:DISABLED);
    printf(API_INDEX_HEALTHY, api_index_healthy_enabled?ENABLED:DISABLED);
    printf(API_INDEX_CHATBOX, api_index_chatbox_enabled?ENABLED:DISABLED);
    printf(API_INFERENCE_COMP, api_inference_comp_enabled?ENABLED:DISABLED);
    printf(API_INFERENCE_RAG, api_inference_rag_enabled?ENABLED:DISABLED);
    printf(API_TOKEN, api_token_enabled?ENABLED:DISABLED);
    printf(API_EMBEDDING_CALC, api_embedding_calc_enabled?ENABLED:DISABLED);
    printf(API_EMBEDDING_DS, api_embedding_ds_enabled?ENABLED:DISABLED);
    printf(API_VERSION, api_version_enabled?ENABLED:DISABLED);
    printf("%s", API_MENU_END);
}
void apiSettings() {
    while(1) {
        logAPIMenu();
        switch(getSelectedOption()) {
            case 'a': case 'A':
                api_index_doc_enabled = !api_index_doc_enabled; break;
            case 'b': case 'B':
                api_index_stats_enabled = !api_index_stats_enabled; break;
            case 'c': case 'C':
                api_index_healthy_enabled = !api_index_healthy_enabled; break;
            case 'd': case 'D':
                api_index_chatbox_enabled = !api_index_chatbox_enabled; break;
            case 'e': case 'E':
                api_inference_comp_enabled = !api_inference_comp_enabled; break;
            case 'f': case 'F':
                api_inference_rag_enabled = !api_inference_rag_enabled; break;
            case 'g': case 'G':
                api_token_enabled = !api_token_enabled; break;
            case 'h': case 'H':
                api_embedding_calc_enabled = !api_embedding_calc_enabled; break;
            case 'i': case 'I':
                api_embedding_ds_enabled = !api_embedding_ds_enabled; break;
            case 'j': case 'J':
                api_version_enabled = !api_version_enabled; break;
            case 'q': case 'Q': case ESC:
                return;
            case 'y': case 'Y':
                api_index_doc_enabled = 1;
                api_index_stats_enabled = 1;
                api_index_healthy_enabled = 1;
                api_index_chatbox_enabled = 1;
                api_inference_comp_enabled = 1;
                api_inference_rag_enabled = 1;
                api_token_enabled = 1;
                api_embedding_calc_enabled = 1;
                api_embedding_ds_enabled = 1;
                api_version_enabled = 1;
                break;
            case 'z': case 'Z':
                api_index_doc_enabled = 0;
                api_index_stats_enabled = 0;
                api_index_healthy_enabled = 0;
                api_index_chatbox_enabled = 0;
                api_inference_comp_enabled = 0;
                api_inference_rag_enabled = 0;
                api_token_enabled = 0;
                api_embedding_calc_enabled = 0;
                api_embedding_ds_enabled = 0;
                api_version_enabled = 0;
                break;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}
// ===============================SAVE SETTINGS===============================
void buildSettings() {
    while(1) {
        logMenu(SAVE_AND_BUILD_MENU);
        switch(getSelectedOption()) {
            case 'a': case 'A':
                saveSettings(1);
                break;
            case 'b': case 'B':
                saveDefaultSettings();
                break;
            case 'c': case 'C':
                saveSettings(0);
                system("sh setup/setup.sh");
                break;
            case 'q': case 'Q': case ESC:
                return;
            case '\n': break;
            default: logMessage(INVALID_OPTION); break;
        }
    }
}

void saveSettings(int show_message) {
    // CONFIG
    FILE* f = fopen("setup/config.h", "w");
    fprintf(f, CONFIG_H_FILE,
        inference_model_name,
        inference_model_url,
        inference_cpu_cores,
        inference_thread_counts,
        embedding_cpu_cores,
        embedding_thread_counts,
        allow_origin_name,
        https_enabled,
        https_cert_path_host,
        https_cert_path_container,
        https_cert_name,
        https_privkey_name,
        https_ca_name,
        (
            strcmp(app_expose_port, "http") == 0 ? "80" :
            strcmp(app_expose_port, "https") == 0 ? "443" :
            app_expose_port
        ),
        plugin_enabled,
        system_instruction,
        static_api_key_enabled,
        static_api_key_value,
        default_dataset_enabled,
        default_dataset_name,
        api_index_doc_enabled,
        api_index_stats_enabled,
        api_index_healthy_enabled,
        api_index_chatbox_enabled,
        api_inference_comp_enabled,
        api_inference_rag_enabled,
        api_token_enabled,
        api_embedding_calc_enabled,
        api_embedding_ds_enabled,
        api_version_enabled,
        dev_mode_enabled,
        database_bind_path
    );
    fclose(f);

    // ENV
    f = fopen(".env", "w");
    fprintf(f, ENV_FILE,
        app_expose_port,
        database_bind_path,
        inference_cpu_cores,
        inference_thread_counts,
        embedding_cpu_cores,
        embedding_thread_counts,
        inference_model_name
    );
    fclose(f);

    // ENV PRODUCTION
    int all_apis_available = 
        api_index_doc_enabled &&
        api_index_stats_enabled &&
        api_index_healthy_enabled &&
        api_index_chatbox_enabled &&
        api_inference_comp_enabled &&
        api_inference_rag_enabled &&
        api_token_enabled &&
        api_embedding_calc_enabled &&
        api_embedding_ds_enabled &&
        api_version_enabled;
    char* api_enabled_str;
    if(all_apis_available) {
        api_enabled_str = "ALL";
    } else {
        asprintf(&api_enabled_str, AVAILABLE_APIS_FORMAT,
            api_index_doc_enabled,
            api_index_stats_enabled,
            api_index_healthy_enabled,
            api_index_chatbox_enabled,
            api_inference_comp_enabled,
            api_inference_rag_enabled,
            api_token_enabled,
            api_embedding_calc_enabled,
            api_embedding_ds_enabled,
            api_version_enabled
        );
    }

    f = fopen(".env.production", "w");
    fprintf(f, ENV_PRODUCTION_FILE,
        allow_origin_name,
        static_api_key_enabled,
        plugin_enabled,
        https_enabled,
        https_cert_path_container, https_privkey_name,
        https_cert_path_container, https_cert_name,
        https_cert_path_container, https_ca_name,
        system_instruction,
        default_dataset_enabled,
        default_dataset_name,
        api_enabled_str
    );
    fclose(f);

    if(!all_apis_available) free(api_enabled_str);

    // DOCKER-COMPOSE
    f = fopen("docker-compose-adv.yaml", "w");
    // check if should bind secret volume to host machine
    int secret_bind_check = 
        https_enabled && 
        strcmp(https_cert_path_host, "*") != 0 && 
        strcmp(https_cert_path_container, "*") != 0;
    char *docker_compose_ssl_str;
    if(secret_bind_check) {
        asprintf(
            &docker_compose_ssl_str, COMPOSE_FILE_SSL_INFO, 
            https_cert_path_host, https_cert_name, https_cert_path_container, https_cert_name,
            https_cert_path_host, https_privkey_name, https_cert_path_container, https_privkey_name,
            https_cert_path_host, https_ca_name, https_cert_path_container, https_ca_name
        );
    }

    int static_api_key_availibility = 
        static_api_key_enabled && 
        strcmp(static_api_key_value, "*") != 0;

    char* static_api_key_str;
    if(static_api_key_availibility) asprintf(&static_api_key_str, COMPOSE_FILE_STATIC_API_KEY, static_api_key_value);
    
    fprintf(f, DOCKER_COMPOSE_FILE, 
        static_api_key_availibility ? static_api_key_str : "",
        dev_mode_enabled ? COMPOSE_FILE_DEV_MODE : "",
        secret_bind_check ? docker_compose_ssl_str : ""
    );

    if(secret_bind_check) free(docker_compose_ssl_str);
    if(static_api_key_availibility) free(static_api_key_str);
    fclose(f);

    // DOCKERFILE
    f = fopen("setup/Dockerfile", "w");
    fprintf(f, DOCKERFILE,
        (
            api_index_healthy_enabled ?
            DOCKERFILE_ENABLE_HEALTHY_CHECK :  ""
        ),
        (
            dev_mode_enabled ?
            DOCKERFILE_DEV_COMMAND : DOCKERFILE_PROD_COMMAND
        ),
        (
            dev_mode_enabled ?
            DOCKERFILE_DEV_ENTRYPOINT : DOCKERFILE_PROD_ENTRYPOINT
        )
    );
    fclose(f);

    // SHELL
    f = fopen("setup/setup.sh", "w");
    fprintf(f, SHELL_FILE,
        inference_model_name,
        inference_model_url,
        EMBEDDING_MODEL_NAME,
        EMBEDDING_MODEL_URL
    );
    fclose(f);

    if(show_message) logMessage(SAVE_CONFIG_SUCCESS);
}

void saveDefaultSettings() {
    inference_model_name = DEFAULT_INFERENCE_MODEL_NAME;
    inference_model_url = DEFAULT_INFERENCE_MODEL_URL;
    inference_cpu_cores = DEFAULT_INFERENCE_CPU_CORES;
    inference_thread_counts = DEFAULT_INFERENCE_THREAD_COUNTS;
    embedding_cpu_cores = DEFAULT_EMBEDDING_CPU_CORES;
    embedding_thread_counts = DEFAULT_EMBEDDING_THREAD_COUNTS;
    allow_origin_name = DEFAULT_ALLOW_ORIGIN_NAME;
    https_enabled = DEFAULT_HTTPS_ENABLED;
    https_cert_path_host = DEFAULT_HTTPS_CERT_PATH_HOST;
    https_cert_path_container = DEFAULT_HTTPS_CERT_PATH_CONTAINER;
    https_cert_name = DEFAULT_HTTPS_CERT_NAME;
    https_privkey_name = DEFAULT_HTTPS_PRIVKEY_NAME;
    https_ca_name = DEFAULT_HTTPS_CA_NAME;
    app_expose_port = DEFAULT_APP_EXPOSE_PORT;
    plugin_enabled = DEFAULT_PLUGIN_ENABLED;
    system_instruction = DEFAULT_SYSTEM_INSTRUCTION;
    static_api_key_enabled = DEFAULT_STATIC_API_KEY_ENABLED;
    static_api_key_value = DEFAULT_STATIC_API_KEY;
    default_dataset_enabled = DEFAULT_DEFAULT_DATASET_ENABLED;
    default_dataset_name = DEFAULT_DEFAULT_DATASET_NAME;
    api_index_doc_enabled = DEFAULT_API_INDEX_DOC_ENABLED;
    api_index_stats_enabled = DEFAULT_API_INDEX_STATS_ENABLED;
    api_index_healthy_enabled = DEFAULT_API_INDEX_HEALTHY_ENABLED;
    api_index_chatbox_enabled = DEFAULT_API_INDEX_CHATBOX_ENABLED;
    api_inference_comp_enabled = DEFAULT_API_INFERENCE_COMP_ENABLED;
    api_inference_rag_enabled = DEFAULT_API_INFERENCE_RAG_ENABLED;
    api_token_enabled = DEFAULT_API_TOKEN_ENABLED;
    api_embedding_calc_enabled = DEFAULT_API_EMBEDDING_CALC_ENABLED;
    api_embedding_ds_enabled = DEFAULT_API_EMBEDDING_DS_ENABLED;
    api_version_enabled = DEFAULT_API_VERSION_ENABLED;
    dev_mode_enabled = DEFAULT_DEV_MODE_ENABLED;
    database_bind_path = DEFAULT_DATABASE_BIND_PATH;
    saveSettings(1);
}