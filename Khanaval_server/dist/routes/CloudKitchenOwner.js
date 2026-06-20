import express from "express";
import { SendOtp, verifyOtp } from "../controller/cloude_Kitchen/Owener.js";
const CloudProviderRouter = express.Router();
CloudProviderRouter.post("/send-SignUp-otp", SendOtp);
CloudProviderRouter.post("/SignUp-verifyOtp", verifyOtp);
export default CloudProviderRouter;
//# sourceMappingURL=CloudKitchenOwner.js.map