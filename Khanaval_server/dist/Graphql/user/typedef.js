export const typeDefs = `#graphql
input signupinput {
     token:String!,
     number:String!
     FCMtoken:String!
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
    Subscriber:Boolean!
    myMess:Subscriber
}
type Subscriber {
  id:ID!
  price:Int!,
  totalDays:Int!,
  RemainingDay:Int!,
  messId:GetCurrentMess,
  startAt:String
  lastScannedAt:String
  allScans:[subscannerlatest]
}
type subscannerlatest {
  scannedAt:String
}
`;
//# sourceMappingURL=typedef.js.map