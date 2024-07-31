const system_context = "A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions."

export function formatInferenceContext(history, question) {
    let context = system_context;
    context += history.map(({role, message}) => {
        return `### ${role === 'user' ? 'Human' : 'Assistant'}: ${message || ''}`
    }).join('\n');
    context += `\n### Human: ${question}\n### Assistant:`;
    return context;
}

export function formatOpenAIContext(messages) {
    let context = messages.map(({role, content}) => {
        return `### ${role}: ${content}`;
    }).join("\n");
    context += '\n### assistant:'
    return context;
}