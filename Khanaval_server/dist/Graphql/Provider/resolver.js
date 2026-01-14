import ProviderService from "../../services/Provider.js";
const Query = {
    ProviderverficationOTP: async (parnet, { number }) => {
        return await ProviderService.PROVIDEROTPSEND(number);
    },
    Providerverfication: async (parnet, { payload }) => {
        return await ProviderService.PROVIDERVERIFED(payload);
    },
    ProviderverficationOTPLogin: async (parnet, { number }) => {
        return await ProviderService.PROVIDEROTPSENDLOGIN(number);
    },
    ProviderverficationLogin: async (parnet, { payload }) => {
        return await ProviderService.PROVIDERVERIFEDLOGIN(payload);
    },
    getProviderdata: async (parent, {}, ctx) => {
        if (!ctx.user?._id) {
            throw Error("user Not Authenticated");
        }
        const userdata = await ProviderService.findcurrentUser(ctx.user._id);
        return userdata;
    }
};
const Mutation = {
    _dummy: () => true
};
export const resolvers = {
    Query,
    Mutation
};
//# sourceMappingURL=resolver.js.map