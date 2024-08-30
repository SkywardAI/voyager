/**
 * Generates the script with base_url, to simply embed a chatbot in web page
 * @param {String} base_url The url to send request, default `http://localhost:8000`
 */
export function generateScript(base_url = 'http://localhost:8000', max_tokens = 128) {
    return `
(function() {
    'use strict';

    const BASE_URL="${base_url}";

const styles = \`
<style type="text/css">
.chatbox {
    --container-folded-size: 64px;
    --container-expanded-size: 500px;

    display: block;
    box-sizing: border-box;
    border: 2px solid gray;
    border-radius: 10px;
    position: fixed;
    bottom: 7px;
    right: 7px;
    z-index: 1000;
    transition-duration: .5s;
    background-color: rgba(255, 255, 255, .7);
    font-family: ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";
}

.chatbox.folded {
    width: var(--container-folded-size);
    height: var(--container-folded-size);
}

.chatbox.expanded {
    width: var(--container-expanded-size);
    height: var(--container-expanded-size);
}

@media (max-width: 600px) {
    .chatbox.expanded {
        right: 0;
        bottom: 0;
        width: 100dvw;
        height: 100dvh;
        border-radius: unset;
    }
}

.chatbox > .expand-btn {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
}
.chatbox.folded > .expand-btn > .icon {
    width: 50%;
    height: 50%;
    margin: auto;
    color: rgb(50, 50, 50);
}

.chatbox > .expanded-page {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}

.chatbox > .expanded-page .icon.cancel {
    --icon-size: 20px;
    
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    width: var(--icon-size);
    height: var(--icon-size);
}

.chatbox > .expanded-page > .input-message-form {
    width: 100%;
    height: 40px;
    display: block;
    box-sizing: border-box;
    position: absolute;
    bottom: 10px;
    left: 0px;
    margin-block-end: unset;
}

.chatbox > .expanded-page > .input-message-form > 
.message-input {
    position: absolute;
    width: calc(100% - 20px);
    left: 10px;
    height: 100%;
    border-radius: 20px;
    border: 1px solid gray;
    padding: 0px 40px 0px 10px;
    box-sizing: border-box;
}


.chatbox > .expanded-page > .input-message-form > 
.message-input:focus {
    outline: none;
}

.chatbox > .expanded-page > .input-message-form > 
.submit-btn-container {
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 0;
    width: 40px;
    height: 40px;
    overflow: hidden;
    align-items: center;
    display: flex;
}

.chatbox > .expanded-page > .input-message-form > 
.submit-btn-container > .icon.send {
    width: 50%;
    height: 50%;
    margin: auto;
    transition-duration: .3s;
}

.chatbox > .expanded-page > .input-message-form > 
.submit-btn-container > input[type="submit"] {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
    opacity: 0;
}

.chatbox > .expanded-page > .input-message-form > 
.submit-btn-container:has(> input[type="submit"]:hover) > .icon.send {
    transform: rotate(45deg);
}

.chatbox.expanded > .expanded-page,
.chatbox.folded > .expand-btn {
    transition-delay: .5s;
}

.chatbox.folded > .expanded-page,
.chatbox.expanded > .expand-btn {
    z-index: -1;
    opacity: 0;
}

.chatbox > .expanded-page .icon.cancel:hover,
.chatbox > .expanded-page > .input-message-form > 
.submit-btn-container > input[type="submit"]:hover,
.chatbox.folded > .expand-btn:hover {
    cursor: pointer;
}

.chatbox > .expanded-page > .conversations {
    position: absolute;
    width: 100%;
    height: calc(100% - 100px);
    left: 0;
    top: 40px;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    box-sizing: border-box;
}

.chatbox > .expanded-page > .conversations > .power-by {
    font-size: 13px;
    color: silver;
    margin-top: 20px;
    position: relative;
    text-align: center;
    text-decoration: none;
    display: block;
    transition-duration: .3s;
}

.chatbox > .expanded-page > .conversations > .power-by:hover {
    transform: scale(1.2);
    font-weight: bold;
}

.chatbox > .expanded-page > .conversations > .bubble {
    width: fit-content;
    height: fit-content;
    padding: 10px 20px;
    border-radius: 30px;
    position: relative;
    margin: auto;
    font-size: 17px;
    margin-bottom: 10px;
    word-wrap: break-word;
    max-width: calc(100% - 40px);
}

.chatbox > .expanded-page > .conversations > .bubble.empty {
    display: none;
}

.chatbox > .expanded-page > .conversations > .bubble.user {
    background-color: white;
    border: 1px solid lightgray;
    margin-right: 0;
    border-bottom-right-radius: unset;
}

.chatbox > .expanded-page > .conversations > .bubble.assistant {
    background-color: gray;
    color: white;
    margin-left: 0;
    border-bottom-left-radius: unset;
}

@keyframes dotAnimation {
    0% { color: white; }
    50% { color: rgb(220, 220, 220); }
    100% { color: rgb(200, 200, 200); }
}

.chatbox > .expanded-page > .conversations > .bubble > .icon.dot {
    width: 10px;
    height: 10px;
    animation: dotAnimation 1s infinite linear;
}

.chatbox > .expanded-page > .conversations > .bubble > .icon.dot:nth-child(2) {
    animation-delay: .33s;
}

.chatbox > .expanded-page > .conversations > .bubble > .icon.dot:nth-child(3) {
    animation-delay: .66s;
}
    </style>
\`

    // styles
    document.head.insertAdjacentHTML("beforeend", styles);

    const chat_icon = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon chat" viewBox="0 0 16 16">
        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
    </svg>\`
    
    const cancel_icon = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon cancel" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
    </svg>\`
    
    const send_icon = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon send" viewBox="0 0 16 16">
      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
    </svg>\`
    
    const circle_icon = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon dot" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8"/>
    </svg>\`

    document.body.insertAdjacentHTML("beforeend",
    \`<div class="chatbox folded" id="voyager-chatbox">
        <div class="expand-btn">\${chat_icon}</div>
        <div class="expanded-page">
            <div>\${cancel_icon}</div>
            <div class="conversations" id='conversation-main'>
                <div id='pending-conversation' class="bubble assistant empty"></div>
                <a class="power-by" href="https://github.com/SkywardAI" target="_blank" rel="noopener noreferrer">Powered by SkywardAI</a>
            </div>
            <form class="input-message-form">
                <input class="message-input" name="message" placeholder="Please input your message here" autocomplete="off">
                <div class="submit-btn-container">\${send_icon}<input type="submit"></div>
            </form>
        </div>
    </div>\`)

    function submitMessage(evt) {
        evt.preventDefault();
        const message = evt.target.message.value;
        if(message) inference(message);
        evt.target.message.value = '';
    }

    function createElement(tagName, className, textContent) {
        const elem = document.createElement(tagName);
        elem.className = className;
        textContent.split("\\n").forEach(content=>{
            elem.append(content, document.createElement("br"))
        })
        return elem;
    }
    
    async function inference(message) {
        pending_conversation.before(createElement('div', 'bubble user', message));
        conversation_main.scrollTo({behavior: "smooth", top: conversation_main.scrollHeight})
    
        pending_conversation.innerHTML = \`\${circle_icon}\${circle_icon}\${circle_icon}\`
        pending_conversation.classList.remove('empty')
    
        const resp = await fetch(\`\${BASE_URL}/v1/chat/completions\`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer example-chatbot"
            },
            body: JSON.stringify({
                messages: [
                    {role: 'system', content: "You are a helpful assistant solves problem"},
                    {role: 'user', content: message}
                ],
                stream: true,
                max_tokens: ${max_tokens}
            })
        });
        if(resp.ok) {
            const reader = resp.body.pipeThrough(new TextDecoderStream()).getReader();
            let response = '', started = false;
            while(true) {
                const { value, done } = await reader.read();
                if(!started) {
                    started = true;
                    pending_conversation.textContent = '';
                }
                if(done) break;
                try {
                    value.split("\\n\\n").forEach(json_str => {
                        if(json_str) {
                            const { choices } = JSON.parse(json_str);
                            let content = choices[0].delta.content
                            content = content.replaceAll("  ", "\\xa0\\xa0");
                            response += content;
                            if(content.includes("\\n")) {
                                const content_parts = content.split("\\n")
                                const arr_len = content_parts.length - 1;
                                for(let i = 0; i < content_parts.length; i++) {
                                    pending_conversation.append(content_parts[i])
                                    if(i < arr_len) {
                                        pending_conversation.append(document.createElement("br"));
                                    }
                                }
                            } else pending_conversation.append(content);
                            conversation_main.scrollTo({
                                behavior: "smooth", 
                                top: conversation_main.scrollHeight
                            })
                        }
                    })
                } catch(error) {
                    console.error(error, value)
                }
            }
            pending_conversation.textContent = '';
            pending_conversation.classList.add('empty');
            pending_conversation.before(createElement('div', 'bubble assistant', response));
        }
    }

    const chatbox = document.getElementById('voyager-chatbox');
    const pending_conversation = document.getElementById('pending-conversation');
    const conversation_main = document.getElementById('conversation-main');

    document.querySelector('#voyager-chatbox > .expand-btn').onclick = 
        ()=>chatbox.classList.replace('folded', 'expanded');
    document.querySelector('#voyager-chatbox .icon.cancel').onclick = 
        ()=>chatbox.classList.replace('expanded', 'folded');
    document.querySelector('#voyager-chatbox form.input-message-form').onsubmit = submitMessage;
})();`
}