import { Router } from "express";
import { chatCompletion } from "../actions/inference.js";

export default function inferenceRoute() {
    const router = Router();

    router.post('/completions', chatCompletion);

    return router;
}