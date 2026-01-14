import axios from "axios";

interface IProviderInputSendOTP {
  number: string;
  otp: number;
}

const FAST2SMS_URL = "https://www.fast2sms.com/dev/bulkV2";

const SENTOTPROVIDERS = async ({
  number,
  otp,
}: IProviderInputSendOTP): Promise<boolean> => {
  try {
    const response = await axios.post(
      FAST2SMS_URL,
         {
        route: "q",
        sender_id: "KHANAVAL", // Your approved sender ID
        message: `Your Khanaval verification code is ${otp}. Do not share this code with anyone.`,
        language: "english",
        flash: 0,
        numbers: number,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY!,
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    return response.data.return === true;
  } catch (error: any) {
    console.error("FAST2SMS ERROR:", error.response?.data || error.message);
    throw new Error("Failed to send OTP");
  }
};

export default SENTOTPROVIDERS;
