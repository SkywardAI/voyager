import streamlit as st
import random
import string
import datetime
import tiktoken
from openai import OpenAI

RMIT="RMIT"

encoding = tiktoken.get_encoding("r50k_base") 

client = OpenAI(base_url="http://localhost:8080/v1", api_key="not-needed", organization='SelectedModel')

def writehistory(filename,text):
    with open(filename, 'a', encoding='utf-8') as f:
        f.write(text)
        f.write('\n')
    f.close()

#AVATARS  👷🐦  🥶🌀
av_us = '🦖'  #"🦖"  #A single emoji, e.g. "🧑‍💻", "🤖", "🦖".
av_ass = '👷'

# Set the webpage title
st.set_page_config(
    page_title=f"Your LocalGPT with 🌟 {RMIT}",
    page_icon="🌟",
    layout="wide")

# Create a header element
mytitle = '# Local AI Solutions and LLM-based Chatbot development 🌟'
st.markdown(mytitle, unsafe_allow_html=True)
st.markdown('### Conversation tokens context window')
# function to generate random alphanumeric sequence for the filename
def genRANstring(n):
    """
    n = int number of char to randomize
    """
    N = n
    res = ''.join(random.choices(string.ascii_uppercase +
                                string.digits, k=N))
    return res

# create THE SESSIoN STATES
if "logfilename" not in st.session_state:
## Logger file
    logfile = f'{genRANstring(5)}_log.txt'
    st.session_state.logfilename = logfile
    #Write in the history the first 2 sessions
    writehistory(st.session_state.logfilename,f'{str(datetime.datetime.now())}\n\nYour own LocalGPT with 🌀 {RMIT}\n---\n🧠🫡: You are a helpful assistant.')    
    writehistory(st.session_state.logfilename,f'🌀: How may I help you today?')

if "repeat" not in st.session_state:
    st.session_state.repeat = 1.35

if "temperature" not in st.session_state:
    st.session_state.temperature = 0.1

if "maxlength" not in st.session_state:
    st.session_state.maxlength = 500


# CREATE THE SIDEBAR
with st.sidebar:
    st.image('example/img/project-group-name.png', use_column_width=True)
    st.session_state.temperature = st.slider('Temperature:', min_value=0.0, max_value=1.0, value=0.1, step=0.02)
    st.session_state.maxlength = st.slider('Length reply:', min_value=150, max_value=1000, 
                                           value=500, step=50)
    st.session_state.repeat = st.slider('Repeat Penalty:', min_value=0.0, max_value=2.0, value=1.35, step=0.01)
    st.markdown(f"**Logfile**: {st.session_state.logfilename}")
    btnClear = st.button("Clear History",type="primary", use_container_width=True)


# We store the conversation in the session state.
# This will be used to render the chat conversation.
# We initialize it with the first message we want to be greeted with. 
#Note that the first 3 messages will never be used for the genration, they are only for the Chat interface
if "messages" not in st.session_state:
    st.session_state.messages = [
        {"role": "system", "content": "You are assistant, a helpful assistant. You reply only to the user questions. You always reply in the language of the instructions.",},
        {"role": "user", "content": "Hi, I am P000455CSITCPL."},
        {"role": "assistant", "content": "Hi there, I am assistant, how may I help you today?"}
    ]
# we define the function to clear from the screen the conversation history
def clearHistory():
    st.session_state.messages = [
        {"role": "system", "content": "You are assistant, a helpful assistant. You reply only to the user questions. You always reply in the language of the instructions.",},
        {"role": "user", "content": "Hi, I am P000455CSITCPL."},
        {"role": "assistant", "content": "Hi there, I am assistant, how may I help you today?"}
    ]
if btnClear:
      clearHistory()  


# We loop through each message in the session state and render it as # a chat message.
for message in st.session_state.messages[1:]:
    if message["role"] == "user":
        with st.chat_message(message["role"],avatar=av_us):
            st.markdown(message["content"])
    else:
        with st.chat_message(message["role"],avatar=av_ass):
            st.markdown(message["content"])

# We take questions/instructions from the chat input to pass to the LLM
if user_prompt := st.chat_input("Your message here. Shift+Enter to add a new line", key="user_input"):

    # Add our input to the session state
    st.session_state.messages.append(
        {"role": "user", "content": user_prompt}
    )

    # Add our input to the chat window
    with st.chat_message("user", avatar=av_us):
        st.markdown(user_prompt)
        writehistory(st.session_state.logfilename,f'👷: {user_prompt}')

    
    with st.chat_message("assistant",avatar=av_ass):
        message_placeholder = st.empty()
        with st.spinner("Inferencing..."):
            response = ''
            conv_messages = []
            conv_messages.append(st.session_state.messages[-1])
            full_response = ""

            completion = client.chat.completions.create(
                model="local-model",
                messages=conv_messages,  #st.session_state.messages if you want to keep previous messages,
                temperature=st.session_state.temperature,
                frequency_penalty  = st.session_state.repeat,
                stop=['<|im_end|>','</s>'],
                max_tokens=st.session_state.maxlength,
                stream=True,
            )
            for chunk in completion:
                if chunk.choices[0].delta.content:
                    full_response += chunk.choices[0].delta.content
                    message_placeholder.markdown(full_response + "🌟")

            toregister = full_response + f"""
```

prompt tokens: {len(encoding.encode(st.session_state.messages[-1]['content']))}
generated tokens: {len(encoding.encode(full_response))}
```"""
            message_placeholder.markdown(toregister)
            writehistory(st.session_state.logfilename,f'🌟: {toregister}\n\n---\n\n') 

            
    # Add the response to the session state
    st.session_state.messages.append(
        {"role": "assistant", "content": toregister}
    )
