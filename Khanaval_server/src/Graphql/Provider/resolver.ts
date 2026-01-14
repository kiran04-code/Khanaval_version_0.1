import ProviderService from "../../services/Provider.js";
import type { GraphqlContext } from "../user/types.js";
import type { Iprovider, IproviderlOGIN } from "./types.js";


const Query = {
    ProviderverficationOTP: async (parnet: any, { number }: { number: string }) => {
        return await ProviderService.PROVIDEROTPSEND(number)
    },
    Providerverfication:async (parnet: any, { payload }: { payload:Iprovider })=>{
        return await ProviderService.PROVIDERVERIFED(payload)
    },
    
    ProviderverficationOTPLogin:async (parnet: any, { number }: {  number: string  })=>{
        return await ProviderService.PROVIDEROTPSENDLOGIN(number)
    },
    ProviderverficationLogin:async (parnet: any, { payload }: { payload:IproviderlOGIN })=>{
        return await ProviderService.PROVIDERVERIFEDLOGIN(payload)
    },
    getProviderdata:async(parent:any,{}:{} ,ctx:GraphqlContext)=>{
           if (!ctx.user?._id) {
            throw Error("user Not Authenticated")
        }
        const userdata = await ProviderService.findcurrentUser(ctx.user._id)
        return userdata;
    }

}
const Mutation = {
    _dummy: () => true
};

export const resolvers = {
    Query,
    Mutation
}