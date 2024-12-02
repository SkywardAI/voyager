import { Router } from "express";
import { getAllFiles, uploadFile } from "../actions/file.js";
import multer from "multer";

export default function fileRoute() {
    const router = Router();
    const upload = multer();

    router.post('', upload.single('input'), uploadFile);
    router.get('', getAllFiles);

    return router;
}