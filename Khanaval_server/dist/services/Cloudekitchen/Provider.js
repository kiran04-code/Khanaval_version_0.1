import { redisclient } from "../../config/redis.js";
import { CloudKitchenOwner } from "../../model/Cloude_Kitchen_Provider.js";
import { ApiError } from "../../utils/Apierror.js";
import jwtService from "../JwtToken.js";
import SENTOTPROVIDERS from "../NotificationChannel/FastOTP.js";
import { generateOtp } from "../utiles/GenratedOTP.js";
function OPTKEY(phoneNumber) {
    return `otp:${phoneNumber}`;
}
export class Provider {
    static async SendOtp(phoneNumber) {
        if (!phoneNumber) {
            throw new ApiError(400, "Bad Request Number Required");
        }
        const existUser = await CloudKitchenOwner.findOne({ phoneNumber });
        if (existUser) {
            throw new ApiError(400, "User is Already Register With  this Number");
        }
        const GenratedOtp = generateOtp();
        // const sendotpMessage = await SENTOTPROVIDERS({ number: phoneNumber, otp: GenratedOtp })
        await redisclient.set(OPTKEY(phoneNumber), GenratedOtp);
        // return sendotpMessage
        return;
    }
    static async VerifiedOtp(phoneNumber, otp, providerName) {
        if (!otp) {
            throw new ApiError(400, "OTP is required");
        }
        const redisOtp = await redisclient.get(OPTKEY(phoneNumber));
        if (redisOtp !== otp) {
            throw new ApiError(400, "OTP is Invalid");
        }
        const provider_id = await CloudKitchenOwner.create({
            providerName,
            phoneNumber
        });
        const token = await jwtService.createToken(provider_id);
        await redisclient.del(OPTKEY(phoneNumber));
        return token;
    }
    static async LoginSendOtp(phoneNumber) {
        if (!phoneNumber) {
            throw new ApiError(400, "Bad Request Number Required");
        }
        const existUser = await CloudKitchenOwner.findOne({ phoneNumber });
        if (!existUser) {
            throw new ApiError(404, "User with this Number not found");
        }
        const GenratedOtp = generateOtp();
        // const sendotpMessage = await SENTOTPROVIDERS({ number: phoneNumber, otp: GenratedOtp })
        await redisclient.set(OPTKEY(phoneNumber), GenratedOtp);
        // return sendotpMessage
        return;
    }
    static async LoginVerifiedOtp(phoneNumber, otp) {
        if (!otp) {
            throw new ApiError(400, "OTP is required");
        }
        const redisOtp = await redisclient.get(OPTKEY(phoneNumber));
        if (redisOtp != otp) {
            throw new ApiError(400, "OTP is Invalid");
        }
        const provider_id = await CloudKitchenOwner.findOne({ phoneNumber });
        const token = await jwtService.createToken(provider_id);
        await redisclient.del(OPTKEY(phoneNumber));
        return token;
    }
}
//# sourceMappingURL=Provider.js.map