import { Router } from "express";
import { generateAPIKey } from "../tools/generator.js";

export default function tokenRoute() {
    const router = Router();

    router.get('/api-key', (_, res)=>{
        res.send({api_key: generateAPIKey()})
    })

    return router;
}