// coding=utf-8

// Copyright [2024] [SkywardAI]
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//        http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Router } from "express";

import inferenceRoute from "./inference.js";
import tokenRoute from "./token.js";
// import tracingRoute from "./tracing.js";
import embeddingRoute from "./embedding.js";
// import encoderRoute from "./encoder.js";
// import decoderRoute from "./decoder.js";
import versionRoute from "./version.js";
import { isRouteEnabled } from "../tools/enabledApiDecoder.js";
import { generateScript } from "../tools/web_embed.js";

function indexRoute() {
    const router = Router();

    if(isRouteEnabled("index", "healthy")) {
        router.get('/healthy', (_, res)=>{
            res.status(200).send('ok')
        })
    }

    if(isRouteEnabled("index", "chatbox")) {
        router.get('/chatbox', (req, res)=>{
            const { base_url, max_tokens } = req.query;
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            res.send(generateScript(base_url, max_tokens));
        })
    }

    return router;
}

function generateAPIRouters() {
    const api_router = Router();

    isRouteEnabled("inference") && api_router.use('/chat', inferenceRoute());
    isRouteEnabled("token") && api_router.use('/token', tokenRoute());
    // api_router.use('/tracing', tracingRoute());
    isRouteEnabled("embedding") && api_router.use('/embeddings', embeddingRoute());
    // api_router.use('/encoder', encoderRoute());
    // api_router.use('/decoder', decoderRoute());
    isRouteEnabled("version") && api_router.use('/version', versionRoute());

    return api_router;
}

export default function buildRoutes(app) {
    app.use('/', indexRoute());
    app.use('/v1', generateAPIRouters());
}
