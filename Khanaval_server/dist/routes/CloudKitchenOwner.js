import express from "express";
import { getCloudeCurrentUser, loginSendOtp, loginverifyOtp, SendOtp, verifyOtp } from "../controller/cloude_Kitchen/Owener.js";
import { CreateOrderforClient, UpdateUserSatus } from "../controller/cloude_Kitchen/paymentGateway.js";
import { registerCloudKitchen } from "../controller/cloude_Kitchen/KitchenRegiter.js";
const CloudProviderRouter = express.Router();
CloudProviderRouter.post("/send-SignUp-otp", SendOtp);
CloudProviderRouter.post("/SignUp-verify-Otp", verifyOtp);
CloudProviderRouter.post("/send-login-otp", loginSendOtp);
CloudProviderRouter.post("/login-verify-Otp", loginverifyOtp);
CloudProviderRouter.get("/getcurrenr-onwer-cloude", getCloudeCurrentUser);
CloudProviderRouter.post("/register-kitchen", registerCloudKitchen);
CloudProviderRouter.post("/makePayment", CreateOrderforClient);
CloudProviderRouter.post("/UpdatePaymentStatus/:id", UpdateUserSatus);
export default CloudProviderRouter;
//# sourceMappingURL=CloudKitchenOwner.js.map