import express from "express";
import { Addmenus, BufferimagetoURlimage, DeletetheMenu, getAllDATA, getAllProvider, getAllUser, GetValidMess, verifiyMess } from "../controller/Provoder.js";
import { upload } from "../config/multer.js";
import { Provider } from "../model/Provider.js";
const providerRoutes = express.Router();
providerRoutes.post("/provider/ImageUrl", upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "kitchen", maxCount: 1 },
    { name: "dining", maxCount: 1 }
]), BufferimagetoURlimage);
providerRoutes.get("/getallMess", getAllDATA);
providerRoutes.post("/addmenu", upload.single("image"), Addmenus);
providerRoutes.post("/deleteMenu", DeletetheMenu);
providerRoutes.get("/getValidMess", GetValidMess);
providerRoutes.post("/verifiyMess", verifiyMess);
providerRoutes.get("/getAllUser", getAllUser);
providerRoutes.get("/getAllProvider", getAllProvider);
export default providerRoutes;
//# sourceMappingURL=Provider.js.map