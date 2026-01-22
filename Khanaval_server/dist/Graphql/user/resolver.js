import axios from "axios";
import { Token } from "graphql";
import { googlerespose } from "../../services/GoogleResponse.js";
import UserService from "../../services/User.js";
const Query = {
    verifiedgoodtokenandnumberforSignup: async (parent, { payload }) => {
        const googletoken = payload.token;
        if (!googletoken) {
            return {
                success: false,
                message: "token not found",
                token: null,
            };
        }
        const googleresult = await googlerespose(googletoken);
        const TokenToReturnUser = await UserService.userSignup({
            first_name: googleresult?.given_name,
            last_name: googleresult?.family_name,
            emailId: googleresult.email,
            number: payload.number,
            imageUrl: googleresult.picture,
            FCMtoken: payload.FCMtoken
        });
        if (TokenToReturnUser == null) {
            return {
                success: false,
                message: "This account already exists. Please log in to continue",
                token: TokenToReturnUser
            };
        }
        return {
            success: true,
            message: "Acount create sucessfully!",
            token: TokenToReturnUser
        };
    },
    getcurrentUser: async (parent, arg, ctx) => {
        if (!ctx.user?._id) {
            throw Error("user Not Authenticated");
        }
        const userdata = await UserService.findcurrentUser(ctx.user._id);
        return userdata;
    },
    verifiedgoodtokenandnumberforSignin: async (parent, { token }) => {
        const googleresult = await googlerespose(token);
        if (!googleresult.email) {
            throw new Error("Google email missing");
        }
        const TokenOfSignIn = await UserService.userLogin(googleresult.email);
        console.log(TokenOfSignIn);
        if (TokenOfSignIn == null) {
            return {
                success: false,
                token: TokenOfSignIn,
                message: "Account not found. Please sign up to continue"
            };
        }
        return {
            success: true,
            token: TokenOfSignIn,
            message: "Login sucessfull"
        };
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