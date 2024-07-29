FROM node:20.15.1-slim
WORKDIR /app
COPY . .

HEALTHCHECK --interval=300s --timeout=30s --start-period=5s --retries=3 CMD [ "node", "healthy-check.js" ]
RUN npm install -g pnpm && pnpm install
EXPOSE 8000
ENTRYPOINT [ "npm", "start" ]