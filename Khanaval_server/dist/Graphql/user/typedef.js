export const typeDefs = `#graphql
input signupinput {
     token:String!,
     number:String!
}
type SignupResponse {
  success: Boolean!
  message:String,
  token: String
}
type User {
    id:ID!
    first_name:String!,
    last_name:String!,
    emailId:String!
    number:String
    imageUrl:String!
}
`;
//# sourceMappingURL=typedef.js.map