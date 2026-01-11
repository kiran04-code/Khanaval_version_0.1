const queres = {
    verifiedgoodtokenandnumberforSignup: async (parent, { payload }) => {
        console.log("SignupSucessfull", payload);
        return "done";
    }
};
const Mutation = {};
export const resolvers = {
    query: queres,
    mutation: Mutation
};
//# sourceMappingURL=resolver.js.map