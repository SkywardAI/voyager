import { Router } from "express";
import { handleEncryption as handleAesEncryption, handleDecryption as handleAesDecryption } from "../actions/aes.js";
import { handleEncryption as handleRsaEncryption, handleDecryption as handleRsaDecryption, getPublicKey } from "../actions/rsa.js";
import { isRouteEnabled } from "../tools/enabledApiDecoder.js";

export default function encryptionRoute() {
    const router = Router();

    isRouteEnabled("encryption", "encrypt-aes") && router.post("/encrypt-aes", handleAesEncryption);
    isRouteEnabled("encryption", "decrypt-aes") && router.post("/decrypt-aes", handleAesDecryption);

    isRouteEnabled("encryption", "encrypt-rsa") && router.post("/encrypt-rsa", handleRsaEncryption);
    isRouteEnabled("encryption", "decrypt-rsa") && router.post("/decrypt-rsa", handleRsaDecryption);

    isRouteEnabled("encryption", "get-rsa-key") && router.get("/get-rsa-key", getPublicKey)

    return router;
}