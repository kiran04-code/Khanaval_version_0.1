import express from "express";
import { loginSendOtp, loginverifyOtp, SendOtp, verifyOtp, getCloudeCurrentUser } from "../controller/cloude_Kitchen/Owener.js";
const CloudProviderRouter = express.Router();
CloudProviderRouter.post("/send-SignUp-otp", SendOtp);
CloudProviderRouter.post("/SignUp-verify-Otp", verifyOtp);
CloudProviderRouter.post("/send-login-otp", loginSendOtp);
CloudProviderRouter.post("/login-verify-Otp", loginverifyOtp);
CloudProviderRouter.get("/getcurrenr-onwer-cloude", getCloudeCurrentUser);
export default CloudProviderRouter;
//# sourceMappingURL=CloudKitchenOwner.js.map