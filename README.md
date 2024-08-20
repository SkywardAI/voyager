# VOYAGER
The project is OpenAI-like API service of SkywardAI ecosystem.

[![Linter and Builder 🚀](https://github.com/SkywardAI/voyager/actions/workflows/linter-builder-checker.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/linter-builder-checker.yml)
[![Release Drafter 🚀](https://github.com/SkywardAI/voyager/actions/workflows/release-drafter.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/release-drafter.yml) 
[![Release Image 🚀](https://github.com/SkywardAI/voyager/actions/workflows/release-image.yml/badge.svg)](https://github.com/SkywardAI/voyager/actions/workflows/release-image.yml)

## BUILD & RUN

### Setting Up Video


https://github.com/user-attachments/assets/2b8f1ea7-0aca-44ea-b218-eff8e1769729


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

### Setup in your server
1. Download this repo into your host machine.
2. Open [generate_production_env.html](./generate_production_env.html) in your browser and
    * Set fields you want to make change according to instructions
    * Click `Generate Env File` button on the bottom
    * Rename the downloaded file to `.env.production` and copy-paste it into root folder of this project
3. Make sure you installed `docker` and `make` in your host machine.
4. Run command `make up` to build & run, find this app on your host machine's port `8000`.


**Hint**: Check [docker-compose.yaml](./docker-compose.yaml), [Makefile](./Makefile) and [plugin.js](./tools/plugin.js) to make it fits your own preference.

## Lint
To start lint your code, simply run
```shell
npm run lint
```

## Monitor
This project got monitor build with swagger-stats, when you got this project running, just go to `<Your Server>:<Your Port>/stats`.  
For example, [http://localhost:8000/stats](http://localhost:8000/stats)
