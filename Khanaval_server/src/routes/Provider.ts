import express from "express"
import { BufferimagetoURlimage } from "../controller/Provoder.js";
import { upload } from "../config/multer.js";

const providerRoutes = express.Router()
providerRoutes.post(
    "/provider/ImageUrl",
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "kitchen", maxCount: 1 },
        { name: "dining", maxCount: 1 }
    ]),
    BufferimagetoURlimage
);
export  default providerRoutes;