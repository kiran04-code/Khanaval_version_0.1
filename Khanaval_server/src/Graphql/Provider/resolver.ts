import mongoose from "mongoose";
import Mess from "../../model/Mess.js";
import ProviderService from "../../services/Provider.js";
import type { GraphqlContext } from "../user/types.js";
import type { CreateMessPayload, Iprovider, IproviderlOGIN } from "./types.js";
import { Provider } from "../../model/Provider.js";
import { Qrcodegenerator } from "./utils/QRCodeGenrator.js";
import { redisclient } from "../../config/redis.js";



const Query = {
    ProviderverficationOTP: async (parnet: any, { number }: { number: string }) => {
        return await ProviderService.PROVIDEROTPSEND(number)
    },
    Providerverfication: async (parnet: any, { payload }: { payload: Iprovider }) => {
        return await ProviderService.PROVIDERVERIFED(payload)
    },

    ProviderverficationOTPLogin: async (parnet: any, { number }: { number: string }) => {
        return await ProviderService.PROVIDEROTPSENDLOGIN(number)
    },
    ProviderverficationLogin: async (parnet: any, { payload }: { payload: IproviderlOGIN }) => {
        return await ProviderService.PROVIDERVERIFEDLOGIN(payload)
    },
    getProviderdata: async (parent: any, { }: {}, ctx: GraphqlContext) => {
        if (!ctx.user?._id) {
            throw Error("user Not Authenticated")
        }
        const userdata = await ProviderService.findcurrentUser(ctx.user?._id)
        return userdata;
    },

    getproviderMessData: async (parent: any, { }: {}, ctx: GraphqlContext) => {
        if (!ctx.user?._id) {
            throw Error("user Not Authenticated")
        }
        const user = await Provider.findById(ctx.user?._id)
        if (!user?.MessRegister) {
            throw Error("user Not Resgiter There Mess")
        }
        const mess = await Mess.findOne({
            providerId: ctx.user?._id,
        }).populate([
            {
                path: "myAllSubscribers",
                populate: {
                    path: "userId", // User inside Subscription
                },
            },
            {
                path: "myAllSubscribersRequest",
            },
        ]);
        if (!mess) {
            return mess
        }
        if (!mess.identity || !mess.legal || !mess.media || !mess.location) {
            throw new Error("Incomplete mess data");
        }

        return {
            id: mess._id.toString(),
            MontlyPrices: mess.MontlyPrices,
            identity: mess.identity,
            legal: mess.legal,
            media: mess.media,
            location: mess.location,
            messVerified: mess.messVerified,
            createdAt: mess.createdAt,
            MessQrcode: mess.MessQrcode,
            Menu: mess.Menu,
            myAllSubscribers: mess.myAllSubscribers,
            myAllSubscribersRequest:mess.myAllSubscribersRequest
        };
    },
}
const Mutation = {
    CreateMessProvider: async (parent: any, { payload }: { payload: CreateMessPayload }, idx: GraphqlContext) => {
        try {
            if (!idx.user?._id) throw Error("User is UnAuthrised")
            const user = await Provider.findById(idx.user?._id)
            if (user?.MessRegister) {
                return {
                    success: false,
                    message: "Mess is Alredy Ragister on this Number"
                }
            }
            const cachekey = "AllMESS"
            await redisclient.del(cachekey)
            const data = await Mess.create({
                providerId: new mongoose.Types.ObjectId(payload.providerId),
                identity: {
                    name: payload.identity.name,
                    ...(payload.identity.dietaryType !== undefined && {
                        dietaryType: payload.identity.dietaryType,
                    }),
                    ...(payload.identity.operatingMode !== undefined && {
                        operatingMode: payload.identity.operatingMode,
                    }),
                    startTime: payload.identity.startTime,
                    endTime: payload.identity.endTime,
                },
                ...(payload.location !== undefined && {
                    location: { ...payload.location },
                }),
                ...(payload.media !== undefined && {
                    media: { ...payload.media },
                }),
                legal: {
                    fssaiNumber: payload.legal.fssaiNumber
                }
            })
            const qrcode = await Qrcodegenerator(data._id)
            await Mess.findByIdAndUpdate(data._id, { MessQrcode: qrcode })
            await Provider.findByIdAndUpdate(idx.user._id, { MessRegister: true })
            return {
                success: true,
                message: "mess create Successfull"
            }
        } catch (err) {
            console.log(err)
        }
    }
};

export const resolvers = {
    Query,
    Mutation
}