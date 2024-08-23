# VOYAGER
The project is OpenAI-like API service of SkywardAI ecosystem.

[![Linter and Builder 🚀](https://github.com/SkywardAI/voyager/actions/workflows/linter-builder-checker.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/linter-builder-checker.yml)
[![Release Drafter 🚀](https://github.com/SkywardAI/voyager/actions/workflows/release-drafter.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/release-drafter.yml) 
[![Release Image 🚀](https://github.com/SkywardAI/voyager/actions/workflows/release-image.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/release-image.yml)

## BUILD & RUN

### Setup and API usage demo video

https://github.com/user-attachments/assets/fa7059c2-309e-486a-a28a-45867613c84b

### CLI 💥
Introducing our new CLI tool!  
> Make sure you can normally run `make`, `docker compose`, `gcc`, `sh` in your host machine.  

Simply run `make setup` in the root folder to compile & run the CLI tool.  
  
Don't want to set? Directly go to `Save & Build` menu in it and use `Build and start the server` option to load the app in default settings.  
  
No gcc compiler? You can choose to compile the file `/setup/setup.c` yourself.
  
Explore it yourself to find more settings!


### Local Machine
* Please make sure you installed `Node.js` on your local machine.  
* This project developed on Node Version `v20.15.0`.  
  
```shell
# Manage package by pnpm
# Install pnpm globally, or change it to your local machine location
npm install -g pnpm

# Install dependencies
pnpm install
# OR
npm install

# RUN
npm run
```

### Container
* Please make sure you have `docker` and `make` installed in your server.  
* Docker version for testing is `27.0.3, build 7d4bcd8`.  
```shell
# to simply start with all needed containers started, please run
make up
# if you just want to build this project to docker container, please run
make build
# if you want to start only this project in docker, please run
make start
# PLEASE NOTE: make start will automatically run make build first

# to run a container bind to your local machine volume, run
make dev
# this will do the same thing as `make up` but allows you to make changes and sync with container
```
**NOTE:** `make dev` Requires Node.js environment installed, or at least have `node_modules` specified in `package.json` installed on your server. Please see [Local Machine](#local-machine) section.

## Embed your chatbot into website
To embed a chatbot to your website, simply add  
```html
<script src='http://localhost:8000/chatbox?base_url=http%3A%2F%2Flocalhost%3A8000' defer></script>
```
into the bottom of your html body element. So easy!  
Please change the `http://localhost:8000` and the base_url in request query to your real host to make sure it works.  
  
If you want to hide the real link, in your javascript code you can do  
```js
const chatbox_script = await (await fetch("http://localhost:8000/chatbox?base_url=http%3A%2F%2Flocalhost%3A8000")).blob();
const chatbox_url = URL.createObjectURL(chatbox_script);
const script_elem = document.createElement('script');
script_elem.src = chatbox_url;
document.body.append(script_elem);
```
And remember to use `URL.revokeObjectURL(chatbox_url)` if you don't need it anymore.

## Lint
To start lint your code, simply run
```shell
npm run lint
```

## Monitor
This project got monitor build with swagger-stats, when you got this project running, just go to `<Your Server>:<Your Port>/stats`.  
For example, [http://localhost:8000/stats](http://localhost:8000/stats)
