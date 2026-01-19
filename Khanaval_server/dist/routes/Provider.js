import express from "express";
import { Addmenus, BufferimagetoURlimage, DeletetheMenu, getAllDATA } from "../controller/Provoder.js";
import { upload } from "../config/multer.js";
const providerRoutes = express.Router();
providerRoutes.post("/provider/ImageUrl", upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "kitchen", maxCount: 1 },
    { name: "dining", maxCount: 1 }
]), BufferimagetoURlimage);
providerRoutes.get("/getallMess", getAllDATA);
providerRoutes.post("/addmenu", upload.single("image"), Addmenus);
providerRoutes.post("/deleteMenu", DeletetheMenu);
export default providerRoutes;
//# sourceMappingURL=Provider.js.map