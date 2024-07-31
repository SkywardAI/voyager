import { formatOpenAIContext } from "../tools/formatContext.js";
import { generateFingerprint } from "../tools/generator.js";
import { post } from "../tools/request.js";

function generateResponseContent(id, object, model, system_fingerprint, stream, content, stopped) {
    const resp = {
        id,
        object,
        created: Date.now(),
        model,
        system_fingerprint,
        choices: [{
            index: 0,
            [stream ? 'delta':'message']: {
                role: 'assistant',
                content
            },
            logprobs: null,
            finish_reason: stopped ? 'stop' : null
        }],
    }
    if(!stream) {
        resp.usage = {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
        }
    }
    return resp;
}

export async function chatCompletion(req, res) {
    const api_key = (req.headers.authorization || '').split('Bearer ').pop();
    if(!api_key) {
        res.status(401).send('Not Authorized');
        return;
    }

    const system_fingerprint = generateFingerprint();
    let {messages, ...request_body} = req.body;
    request_body.prompt = formatOpenAIContext(messages);
    const model = request_body.model || process.env.LANGUAGE_MODEL_NAME

    if(request_body.stream) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("X-Accel-Buffering", "no");
        res.setHeader("Connection", "Keep-Alive");
        
        const eng_resp = await post('completion', { body: request_body }, { getJSON: false });
        const reader = eng_resp.body.pipeThrough(new TextDecoderStream()).getReader();
        while(true) {
            const { value, done } = await reader.read();
            if(done) break;
            const data = value.split("data: ").pop()
            const json_data = JSON.parse(data)
            const { content, stop } = json_data;
            res.write(JSON.stringify(generateResponseContent(api_key, 'chat.completion.chunk', model, system_fingerprint, true, content, stop))+'\n\n');
        }
        res.end();
    } else {
        const eng_resp = await post('completion', { body: request_body });
        const { model, content } = eng_resp;
        const response_json = generateResponseContent(
            api_key, 'chat.completion', model, system_fingerprint,
            false, content, true
        )
        res.send(response_json);
    }
}