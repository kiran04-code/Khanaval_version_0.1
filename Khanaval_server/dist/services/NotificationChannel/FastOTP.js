import axios from "axios";
const FAST2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";
const sendOTPFast2SMS = async ({ number, otp, }) => {
    try {
        const response = await axios.post(FAST2SMS_URL, {
            route: "otp", // ✅ OTP route (NO DLT needed)
            variables_values: otp, // OTP value
            numbers: number, // Mobile number
        }, {
            headers: {
                authorization: process.env.FAST2SMS_API_KEY,
                "Content-Type": "application/json",
            },
        });
        console.log("Fast2SMS Response:", response.data);
        return response.data.return === true;
    }
    catch (error) {
        console.error("FAST2SMS ERROR:", error.response?.data || error.message);
        return false;
    }
};
export default sendOTPFast2SMS;
//# sourceMappingURL=FastOTP.js.map