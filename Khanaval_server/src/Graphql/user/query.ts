export const query = `#graphql 
verifiedgoodtokenandnumberforSignup(payload:signupinput!):SignupResponse
verifiedgoodtokenandnumberforSignin(token:String!):SignupResponse
getcurrentUser:User
`;