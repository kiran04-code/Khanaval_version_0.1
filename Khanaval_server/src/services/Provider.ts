import { Redis } from "ioredis"

import { generateOtp } from "./utiles/GenratedOTP.js";
import { Provider } from "../model/Provider.js";
import { redisclient } from "../config/redis.js";
import SENTOTPROVIDERS from "./NotificationChannel/FastOTP.js";
import type { Iprovider, IproviderlOGIN } from "../Graphql/Provider/types.js";
import jwtService from "./JwtToken.js";



class ProviderService {
    public static async PROVIDEROTPSEND(number: string) {
        try {
            const GenratedProviderOTP = generateOtp()
            const redisKey = `otp:provider:${number}`;
            const userfound = await Provider.findOne({ number:number})
            if (userfound) {
                return {
                    success: false,
                    message: "user with this account already exists. Kindly log in."
                }
            }
            const OTPSendSucess = await SENTOTPROVIDERS({ number: number, otp: GenratedProviderOTP })
            await redisclient.set(redisKey, GenratedProviderOTP)
            if (OTPSendSucess) {
                return {
                    success: OTPSendSucess,
                    message: "OTP Send Sucessfully"
                }
            }
            return {
                success: OTPSendSucess,
                message: "number NOT VALID"
            }
        } catch (error) {
            throw Error("SOME WHENT WRONG WITH PROVIDER OTP")
        }
    }
    public static async PROVIDERVERIFED(data: Iprovider) {
        try {

            const redisKey = `otp:provider:${data.number}`;
            const otps = await redisclient.get(redisKey)
            if (Number(otps) !== data.otp) {
                return {
                    success: false,
                    message: "Invalid OTP",
                    token: null
                }
            }
            const existsiUser = await Provider.findOne({ number: data.number })
            if (existsiUser) {
                return {
                    success: false,
                    message: "user with this account already exists. Kindly log in.",
                    token: null
                }
            }
            const providerdata = await Provider.create({
                OwnerName: data.Ownername,
                number: data.number,
                FCMtoken:data.FCMtoken
            })
            await redisclient.del(redisKey)
            console.log(providerdata)
            const createdToken = await jwtService.createToken(providerdata)
            return {
                success: true,
                message: "OTP verified successfully.Account Created Sucessfully.",
                token: createdToken
            }
        } catch (error) {
            throw Error("OTP VERIFICATION FAILED")
        }
    }
    public static async PROVIDEROTPSENDLOGIN(number: string) {
        try {
            const GenratedProviderOTP = generateOtp()
            const redisKey = `otp:provider:${number}`;
            const userfound = await Provider.findOne({ number: number })
            if (!userfound) {
                return {
                    success: false,
                    message: "Provider not found. Kindly Create Account."
                }
            }
            const OTPSendSucess = await SENTOTPROVIDERS({ number: number, otp: GenratedProviderOTP })
            await redisclient.set(redisKey, GenratedProviderOTP)
            if (OTPSendSucess) {
                return {
                    success: OTPSendSucess,
                    message: "OTP Send Sucessfully"
                }
            }
            console.log("OTP SENDED")
            return {
                success: OTPSendSucess,
                message: "number NOT VALID"
            }
        } catch (error) {
            throw Error("SOME WHENT WRONG WITH PROVIDER OTP")
        }
    }
     public static async PROVIDERVERIFEDLOGIN(data: IproviderlOGIN) {
        try {
            const redisKey = `otp:provider:${data.number}`;
            const otps = await redisclient.get(redisKey)
            const existsiUser = await Provider.findOne({ number: data.number })
            if (!existsiUser) {
                return {
                    success: false,
                    message: "Provider not found.Kindly Create Account.",
                    token: null
                }
            }
            if (Number(otps) !== data.otp) {
                return {
                    success: false,
                    message: "Invalid OTP",
                    token: null
                }
            }
            await redisclient.del(redisKey)
            const createdToken = await jwtService.createToken(existsiUser)
            console.log("LOGIN SUCESS FULLY")
            return {
                success: true,
                message: "OTP verified successfully. You are now logged in.”",
                token: createdToken
            }
        } catch (error) {
            throw Error("OTP VERIFICATION FAILED")
        }
    }
    public static async findcurrentUser(id:string){
        console.log(id)
     const data = await  Provider.findById(id)
     return data
    }
}

export default ProviderService;