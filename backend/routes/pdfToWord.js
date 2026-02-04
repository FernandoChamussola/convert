import express from "express";
import PdfToWord from "../controller/pdfToWord.js";
import { uploadDoc } from "../config/multer.js";

const route = express.Router();

route.post("/pdf-to-word", uploadDoc.single('document'), PdfToWord.convert);

export default route;
