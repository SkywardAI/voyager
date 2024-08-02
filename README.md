# VOYAGER
This project is OpenAI-like API set for SkywardAI project.

## BUILD & RUN

### Setting Up Video


https://github.com/user-attachments/assets/2b8f1ea7-0aca-44ea-b218-eff8e1769729



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

## Lint
To start lint your code, simply run
```shell
npm run lint
```

## Monitor
This project got monitor build with swagger-stats, when you got this project running, just go to `<Your Server>:<Your Port>/stats`.  
For example, [http://localhost:8000/stats](http://localhost:8000/stats)
