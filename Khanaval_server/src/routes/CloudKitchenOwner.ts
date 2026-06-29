import express from "express"
import { getCloudeCurrentUser, loginSendOtp, loginverifyOtp, SendOtp, verifyOtp } from "../controller/cloude_Kitchen/Owener.js";
import { CreateOrderforClient, UpdateUserSatus } from "../controller/cloude_Kitchen/paymentGateway.js";
import { AddItemToMenu, DeleteMenuByID, GetAllCloudeKitchne, MessOnOffByid, registerCloudKitchen } from "../controller/cloude_Kitchen/KitchenRegiter.js";
import { CloudKitchenAuth } from "../middleware/AuthenticateCloudKicthen.js";

const CloudProviderRouter = express.Router();

CloudProviderRouter.post("/send-SignUp-otp", SendOtp)
CloudProviderRouter.post("/SignUp-verify-Otp", verifyOtp)
CloudProviderRouter.post("/send-login-otp", loginSendOtp)
CloudProviderRouter.post("/login-verify-Otp", loginverifyOtp)
CloudProviderRouter.get("/getcurrenr-onwer-cloude", getCloudeCurrentUser)
CloudProviderRouter.post("/makePayment", CreateOrderforClient)
CloudProviderRouter.post("/UpdatePaymentStatus/:id", UpdateUserSatus)

// After payment this All Routes we to Used on Cloude Kitchen
CloudProviderRouter.post("/register-kitchen", CloudKitchenAuth, registerCloudKitchen)
CloudProviderRouter.post("/AddItem-To-Menu/:kid", CloudKitchenAuth, AddItemToMenu)
CloudProviderRouter.get("/getCloudKitchen", GetAllCloudeKitchne)
CloudProviderRouter.get("/DeleteMenuByID/:menuId", DeleteMenuByID)
CloudProviderRouter.get("/MenuonOff/:messId", MessOnOffByid)


export default CloudProviderRouter;
