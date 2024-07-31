import { Router } from "express";

import inferenceRoute from "./inference.js";
import tokenRoute from "./token.js";
import tracingRoute from "./tracing.js";
import embeddingRoute from "./embedding.js";
import encoderRoute from "./encoder.js";
import decoderRoute from "./decoder.js";

function indexRoute() {
    const router = Router();

    router.get('/', (_, res)=>{
        res.sendFile(`${process.cwd()}/doc.html`);
    })

    router.get('/healthy', (_, res)=>{
        res.status(200).send('ok')
    })

    return router;
}

function generateAPIRouters() {
    const api_router = Router();

    api_router.use('/chat', inferenceRoute());
    api_router.use('/token', tokenRoute());
    api_router.use('/tracing', tracingRoute());
    api_router.use('/embedding', embeddingRoute());
    api_router.use('/encoder', encoderRoute());
    api_router.use('/decoder', decoderRoute());

    return api_router;
}

export default function buildRoutes(app) {
    app.use('/', indexRoute());
    app.use('/v1', generateAPIRouters());
}