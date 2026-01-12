import axios from "axios";
import type { GoogleAuthPayload, GraphqlContext, Userdata } from "./types.js"
import { Token } from "graphql";
import { googlerespose } from "../../services/GoogleResponse.js";
import UserService from "../../services/User.js";

const Query = {
    verifiedgoodtokenandnumberforSignup: async (parent: any, { payload }: { payload: Userdata }) => {
        const googletoken = payload.token;
        if (!googletoken) {
            return {
                success: false,
                message: "token not found",
                token: null,
            }
        }
        const googleresult = await googlerespose(googletoken)
        const TokenToReturnUser = await UserService.userSignup(
            {
                first_name: googleresult?.given_name!,
                last_name: googleresult?.family_name!,
                emailId: googleresult.email!,
                number: payload.number,
                imageUrl: googleresult.picture!
            }
        )
        if (TokenToReturnUser == null) {
            return {
                success: false,
                message: "This account already exists. Please log in to continue",
                token: TokenToReturnUser
            }
        }
        return {
            success: true,
            message: "Acount create sucessfully!",
            token: TokenToReturnUser
        }
    },
    getcurrentUser: async (parent: any, arg: any, ctx: GraphqlContext) => {
        if (!ctx.user?._id) {
            throw Error("user Not Authenticated")
        }
        const userdata = await UserService.findcurrentUser(ctx.user._id)
        return userdata;
    },
    verifiedgoodtokenandnumberforSignin: async (parent: any, { token }: { token: string }) => {
        const googleresult = await googlerespose(token)
        if (!googleresult.email) {
            throw new Error("Google email missing");
        }
        const TokenOfSignIn = UserService.userLogin(googleresult.email)
        if (TokenOfSignIn==null) {
            return {
                success: false,
                token: TokenOfSignIn,
                message: "Account not found. Please sign up to continue"
            }
        }
        return {
            success: true,
            token: TokenOfSignIn,
            message: "Login sucessfull"
        }
    }
}
const Mutation = {
    _dummy: () => true
};


export const resolvers = {
    Query,
    Mutation
}