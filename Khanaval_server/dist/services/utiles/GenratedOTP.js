import crypto from "crypto";
export const generateOtp = () => {
    return crypto.randomInt(1000, 10000); // 4-digit OTP
};
//# sourceMappingURL=GenratedOTP.js.map