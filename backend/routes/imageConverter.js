import express from "express"
import ImageConverter from "../controller/imageConverter.js"
import { upload } from "../config/multer.js"

const route = express.Router()

route.post("/image-format", upload.array('images', 20), ImageConverter.convert)

export default route
