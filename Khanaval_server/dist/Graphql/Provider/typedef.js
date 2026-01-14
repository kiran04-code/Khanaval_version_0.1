export const typeDefs = `#graphql
input signupinputp {
     Ownername:String!,
     number:String!
     otp:Int!
}
input loginpinputp {
     number:String!
     otp:Int!
}
type SignupResponseprovider {
  success: Boolean!
  message:String,
}
type SignupResponseOfverifed {
  success: Boolean!
  message:String,
  token:String
}
type provider {
    id:ID!
    OwnerName:String!,
    number:String!,
    emailId:String!
    MessRegister:String}
`;
//# sourceMappingURL=typedef.js.map