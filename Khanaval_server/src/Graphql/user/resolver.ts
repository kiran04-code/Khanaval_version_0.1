import type { Userdata } from "./types.js"

const queres = {
    verifiedgoodtokenandnumberforSignup: async (parent: any, { payload }: { payload: Userdata }) => {
        console.log("SignupSucessfull", payload)
        return "done"
    }
}
const Mutation = {}


export const resolvers = {
    query: queres,
    mutation: Mutation
}