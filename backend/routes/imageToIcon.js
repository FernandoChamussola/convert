import express from "express"
import ImageToIcon from "../controller/imageToIcon.js"
import { upload } from "../config/multer.js"

const route = express.Router()

route.post("/image-to-icon", upload.single('image'), ImageToIcon.convert)

export default route
