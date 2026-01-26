import express from "express"
import { Addmenus, AddToSubscriber, BufferimagetoURlimage, DeletetheMenu, finderUserByNumber, finUderAndDelete, getAllDATA, getAllFeedback, getAllProvider, getAllUser, GetValidMess, MarkMealAttendece, NotificationsPUSH, sendFeedback, sendMessageToAllUser, submitFeedback, verifiyMess } from "../controller/Provoder.js";
import { upload } from "../config/multer.js";
import { Provider } from "../model/Provider.js";

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
providerRoutes.get("/getallMess",getAllDATA)
providerRoutes.post("/addmenu", upload.single("image"),Addmenus)
providerRoutes.post("/deleteMenu",DeletetheMenu)
providerRoutes.get("/getValidMess",GetValidMess)
providerRoutes.post("/verifiyMess",verifiyMess)
providerRoutes.get("/getAllUser",getAllUser)
providerRoutes.get("/getAllProvider",getAllProvider)
providerRoutes.post("/sendFeedback",sendFeedback)
providerRoutes.post("/ProviderNotify",NotificationsPUSH)
providerRoutes.post("/users/verify",finderUserByNumber)
providerRoutes.post("/UserNotify",sendMessageToAllUser)
providerRoutes.post("/getFeedBack",submitFeedback)
providerRoutes.get("/getAllFeedBack",getAllFeedback)
providerRoutes.post("/subscriptions/add",AddToSubscriber)
providerRoutes.post("/subscriptions/remove",finUderAndDelete)
providerRoutes.post("/meals/redeem",MarkMealAttendece)
export  default providerRoutes;

