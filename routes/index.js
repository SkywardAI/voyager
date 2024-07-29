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

export default function buildRoutes(app) {
    app.use('/', indexRoute());
    app.use('/inference', inferenceRoute());
    app.use('/token', tokenRoute());
    app.use('/tracing', tracingRoute());
    app.use('/embedding', embeddingRoute());
    app.use('/encoder', encoderRoute());
    app.use('/decoder', decoderRoute());
}