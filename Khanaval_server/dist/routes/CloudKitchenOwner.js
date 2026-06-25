import express from "express";
import { loginSendOtp, loginverifyOtp, SendOtp, verifyOtp, getCloudeCurrentUser } from "../controller/cloude_Kitchen/Owener.js";
import { CreateOrderforClient, UpdateUserSatus } from "../controller/cloude_Kitchen/paymentGateway.js";
const CloudProviderRouter = express.Router();
CloudProviderRouter.post("/send-SignUp-otp", SendOtp);
CloudProviderRouter.post("/SignUp-verify-Otp", verifyOtp);
CloudProviderRouter.post("/send-login-otp", loginSendOtp);
CloudProviderRouter.post("/login-verify-Otp", loginverifyOtp);
CloudProviderRouter.get("/getcurrenr-onwer-cloude", getCloudeCurrentUser);
CloudProviderRouter.post("/makePayment", CreateOrderforClient);
CloudProviderRouter.post("/UpdatePaymentStatus/:id", UpdateUserSatus);
export default CloudProviderRouter;
//# sourceMappingURL=CloudKitchenOwner.js.map