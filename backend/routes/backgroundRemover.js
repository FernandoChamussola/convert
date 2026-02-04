import express from "express"
import BackgroundRemover from "../controller/backgroundRemover.js"
import { upload } from "../config/multer.js"

const route = express.Router()

route.post("/remove-background", upload.array('images', 10), BackgroundRemover.remove)

export default route
