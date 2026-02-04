import express from "express"
import ImageResize from "../controller/imageResize.js"
import { upload } from "../config/multer.js"

const route = express.Router()

route.post("/image-resize", upload.array('images', 20), ImageResize.resize)

export default route
