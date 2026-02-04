import express from "express";
import WordToPdf from "../controller/wordToPdf.js";
import { uploadDoc } from "../config/multer.js";

const route = express.Router();

route.post("/word-to-pdf", uploadDoc.single('document'), WordToPdf.convert);

export default route;
