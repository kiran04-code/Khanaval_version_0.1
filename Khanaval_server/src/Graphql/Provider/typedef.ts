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

input  CreateMessdata {
  providerId:String!
  identity:Identity
  legal:Legal!
  media:Media!
  location:Location!
}
input Location {
address: String!
city: String!
houseNo:String!
landmark:String!
lat: Float!
lng:Float!
postcode:String!
society: String!
state:String!
suburb: String
}
input Media {
  cover:String!
  kitchen:String!
  dining:String!
}
input Legal{
  fssaiNumber:String!
}
input Identity {
  name:String!,
  startTime:String!,
  endTime:String!
  dietaryType:String!
  operatingMode:String
}
type  GetCurrentMess{
  id:ID!
  identity:Identitys!
  legal:Legals!
  media:Medias!
  location:Locations!
  messVerified:Boolean!
  createdAt:String!
  MessQrcode:String!
  Menu:[menu]!
}
type Locations {
address: String!
city: String!
houseNo:String!
landmark:String!
lat: Float!
lng:Float!
postcode:String!
society: String!
state:String!
suburb: String
}
type menu {
  types:String
  imageUrl:String
  CreateAt:String
}
type Medias {
  cover:String!
  kitchen:String!
  dining:String!
}
type Legals{
  fssaiNumber:String!
}
type Identitys {
  name:String!,
  startTime:String!,
  endTime:String!
  dietaryType:String!
  operatingMode:String
}

type provider {
    id:ID!
    OwnerName:String!,
    number:String!,
    emailId:String!
    MessRegister:String}
`;