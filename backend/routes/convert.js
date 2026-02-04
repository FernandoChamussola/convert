import express from "express"
import Convert from "../controller/convert.js"
import { upload } from "../config/multer.js"

const route = express.Router()

route.post("/convert",upload.array('images', 10), Convert.toPDF)

export default route;