/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery ProviderverficationOTPQuery($number:String!){\n    ProviderverficationOTP(number:$number){\n        success,\n        message\n    }\n}\n": typeof types.ProviderverficationOtpQueryDocument,
    "\nquery ProviderverficationQuery($payload:signupinputp!){\n    Providerverfication(payload:$payload){\n        success,\n        message,\n        token\n    }\n}\n": typeof types.ProviderverficationQueryDocument,
    "\nquery ProviderverficationOTPQueryFORLogin($number: String!){\n    ProviderverficationOTPLogin(number: $number){\n        success,\n        message\n    }\n}\n": typeof types.ProviderverficationOtpQueryForLoginDocument,
    "\nquery ProviderverficationQueryFORLogin($payload: loginpinputp!){\n    ProviderverficationLogin(payload: $payload){\n        success,\n            message,\n            token\n    }\n}\n": typeof types.ProviderverficationQueryForLoginDocument,
    "\nquery GetCurrentData{\n    getProviderdata {\n    id,\n    OwnerName,\n    number,\n    MessRegister,\n  }\n}\n": typeof types.GetCurrentDataDocument,
    "\nmutation Createmesforprovider($payload:CreateMessdata!){\n    CreateMessProvider(payload:$payload){\n        success,\n        message\n    }\n}": typeof types.CreatemesforproviderDocument,
    "\nquery GetcurentMessdata{\n     getproviderMessData {\n     id,\n     MontlyPrices,\n     identity {\n      name\n      startTime\n      endTime\n      dietaryType\n      operatingMode\n    }\n    legal {\n      fssaiNumber\n    }\n    media {\n      cover\n      kitchen\n      dining\n    }\n    location {\n      address\n      houseNo\n      society\n      landmark\n      suburb\n      city\n      state\n      postcode\n      lat\n      lng\n    }\n    messVerified,\n        myAllSubscribersRequest{\n      userName,\n      phoneNumber\n    }\n    createdAt\n    MessQrcode\n    Menu {\n        _id\n      types\n      imageUrl\n      createdAt\n      menuText\n    },\n     myAllSubscribers{\n        id,\n    price\n    totalDays,\n    startAt,\n    lastScannedAt,\n    RemainingDay\n     allScans {\n        scannedAt\n      }\n    userId {\n        id,\n      first_name,\n      last_name,\n      number,\n      emailId\n    }\n  }\n    }\n  }\n\n": typeof types.GetcurentMessdataDocument,
    "\nquery VerifiedUserGoogle($payload: signupinput!) {\n  verifiedgoodtokenandnumberforSignup(payload: $payload) {\n    success\n    token\n    message\n  }\n  \n}\n": typeof types.VerifiedUserGoogleDocument,
    "\nquery VerifiedUsersigninGoogle($token: String!) {\n  verifiedgoodtokenandnumberforSignin(token: $token) {\n    success\n    token\n    message\n  }\n  \n}\n": typeof types.VerifiedUsersigninGoogleDocument,
    "\nquery GetcurrentUser{\n  getcurrentUser{\n    id,\n  number,\n  first_name,\n  last_name,\n  emailId,\n  Subscriber,\n  imageUrl,\n   myMess {\n    id,\n    price,\n    RemainingDay,\n    totalDays,\n    startAt,\n    lastScannedAt\n    allScans {\n      scannedAt\n    },\n   messId {\n    id\n    identity {\n      name,\n      dietaryType,\n      operatingMode\n    },\n    location {\n      address,\n      city,\n      landmark,\n    }\n   }\n  } ,\n  Address {\n   address,\n    houseNo,\n    society,\n    landmark,\n    suburb,\n    city,\n    state,\n    postcode,\n    lat,\n    lng\n  }\n  }\n}\n\n": typeof types.GetcurrentUserDocument,
};
const documents: Documents = {
    "\nquery ProviderverficationOTPQuery($number:String!){\n    ProviderverficationOTP(number:$number){\n        success,\n        message\n    }\n}\n": types.ProviderverficationOtpQueryDocument,
    "\nquery ProviderverficationQuery($payload:signupinputp!){\n    Providerverfication(payload:$payload){\n        success,\n        message,\n        token\n    }\n}\n": types.ProviderverficationQueryDocument,
    "\nquery ProviderverficationOTPQueryFORLogin($number: String!){\n    ProviderverficationOTPLogin(number: $number){\n        success,\n        message\n    }\n}\n": types.ProviderverficationOtpQueryForLoginDocument,
    "\nquery ProviderverficationQueryFORLogin($payload: loginpinputp!){\n    ProviderverficationLogin(payload: $payload){\n        success,\n            message,\n            token\n    }\n}\n": types.ProviderverficationQueryForLoginDocument,
    "\nquery GetCurrentData{\n    getProviderdata {\n    id,\n    OwnerName,\n    number,\n    MessRegister,\n  }\n}\n": types.GetCurrentDataDocument,
    "\nmutation Createmesforprovider($payload:CreateMessdata!){\n    CreateMessProvider(payload:$payload){\n        success,\n        message\n    }\n}": types.CreatemesforproviderDocument,
    "\nquery GetcurentMessdata{\n     getproviderMessData {\n     id,\n     MontlyPrices,\n     identity {\n      name\n      startTime\n      endTime\n      dietaryType\n      operatingMode\n    }\n    legal {\n      fssaiNumber\n    }\n    media {\n      cover\n      kitchen\n      dining\n    }\n    location {\n      address\n      houseNo\n      society\n      landmark\n      suburb\n      city\n      state\n      postcode\n      lat\n      lng\n    }\n    messVerified,\n        myAllSubscribersRequest{\n      userName,\n      phoneNumber\n    }\n    createdAt\n    MessQrcode\n    Menu {\n        _id\n      types\n      imageUrl\n      createdAt\n      menuText\n    },\n     myAllSubscribers{\n        id,\n    price\n    totalDays,\n    startAt,\n    lastScannedAt,\n    RemainingDay\n     allScans {\n        scannedAt\n      }\n    userId {\n        id,\n      first_name,\n      last_name,\n      number,\n      emailId\n    }\n  }\n    }\n  }\n\n": types.GetcurentMessdataDocument,
    "\nquery VerifiedUserGoogle($payload: signupinput!) {\n  verifiedgoodtokenandnumberforSignup(payload: $payload) {\n    success\n    token\n    message\n  }\n  \n}\n": types.VerifiedUserGoogleDocument,
    "\nquery VerifiedUsersigninGoogle($token: String!) {\n  verifiedgoodtokenandnumberforSignin(token: $token) {\n    success\n    token\n    message\n  }\n  \n}\n": types.VerifiedUsersigninGoogleDocument,
    "\nquery GetcurrentUser{\n  getcurrentUser{\n    id,\n  number,\n  first_name,\n  last_name,\n  emailId,\n  Subscriber,\n  imageUrl,\n   myMess {\n    id,\n    price,\n    RemainingDay,\n    totalDays,\n    startAt,\n    lastScannedAt\n    allScans {\n      scannedAt\n    },\n   messId {\n    id\n    identity {\n      name,\n      dietaryType,\n      operatingMode\n    },\n    location {\n      address,\n      city,\n      landmark,\n    }\n   }\n  } ,\n  Address {\n   address,\n    houseNo,\n    society,\n    landmark,\n    suburb,\n    city,\n    state,\n    postcode,\n    lat,\n    lng\n  }\n  }\n}\n\n": types.GetcurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ProviderverficationOTPQuery($number:String!){\n    ProviderverficationOTP(number:$number){\n        success,\n        message\n    }\n}\n"): (typeof documents)["\nquery ProviderverficationOTPQuery($number:String!){\n    ProviderverficationOTP(number:$number){\n        success,\n        message\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ProviderverficationQuery($payload:signupinputp!){\n    Providerverfication(payload:$payload){\n        success,\n        message,\n        token\n    }\n}\n"): (typeof documents)["\nquery ProviderverficationQuery($payload:signupinputp!){\n    Providerverfication(payload:$payload){\n        success,\n        message,\n        token\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ProviderverficationOTPQueryFORLogin($number: String!){\n    ProviderverficationOTPLogin(number: $number){\n        success,\n        message\n    }\n}\n"): (typeof documents)["\nquery ProviderverficationOTPQueryFORLogin($number: String!){\n    ProviderverficationOTPLogin(number: $number){\n        success,\n        message\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery ProviderverficationQueryFORLogin($payload: loginpinputp!){\n    ProviderverficationLogin(payload: $payload){\n        success,\n            message,\n            token\n    }\n}\n"): (typeof documents)["\nquery ProviderverficationQueryFORLogin($payload: loginpinputp!){\n    ProviderverficationLogin(payload: $payload){\n        success,\n            message,\n            token\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetCurrentData{\n    getProviderdata {\n    id,\n    OwnerName,\n    number,\n    MessRegister,\n  }\n}\n"): (typeof documents)["\nquery GetCurrentData{\n    getProviderdata {\n    id,\n    OwnerName,\n    number,\n    MessRegister,\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation Createmesforprovider($payload:CreateMessdata!){\n    CreateMessProvider(payload:$payload){\n        success,\n        message\n    }\n}"): (typeof documents)["\nmutation Createmesforprovider($payload:CreateMessdata!){\n    CreateMessProvider(payload:$payload){\n        success,\n        message\n    }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetcurentMessdata{\n     getproviderMessData {\n     id,\n     MontlyPrices,\n     identity {\n      name\n      startTime\n      endTime\n      dietaryType\n      operatingMode\n    }\n    legal {\n      fssaiNumber\n    }\n    media {\n      cover\n      kitchen\n      dining\n    }\n    location {\n      address\n      houseNo\n      society\n      landmark\n      suburb\n      city\n      state\n      postcode\n      lat\n      lng\n    }\n    messVerified,\n        myAllSubscribersRequest{\n      userName,\n      phoneNumber\n    }\n    createdAt\n    MessQrcode\n    Menu {\n        _id\n      types\n      imageUrl\n      createdAt\n      menuText\n    },\n     myAllSubscribers{\n        id,\n    price\n    totalDays,\n    startAt,\n    lastScannedAt,\n    RemainingDay\n     allScans {\n        scannedAt\n      }\n    userId {\n        id,\n      first_name,\n      last_name,\n      number,\n      emailId\n    }\n  }\n    }\n  }\n\n"): (typeof documents)["\nquery GetcurentMessdata{\n     getproviderMessData {\n     id,\n     MontlyPrices,\n     identity {\n      name\n      startTime\n      endTime\n      dietaryType\n      operatingMode\n    }\n    legal {\n      fssaiNumber\n    }\n    media {\n      cover\n      kitchen\n      dining\n    }\n    location {\n      address\n      houseNo\n      society\n      landmark\n      suburb\n      city\n      state\n      postcode\n      lat\n      lng\n    }\n    messVerified,\n        myAllSubscribersRequest{\n      userName,\n      phoneNumber\n    }\n    createdAt\n    MessQrcode\n    Menu {\n        _id\n      types\n      imageUrl\n      createdAt\n      menuText\n    },\n     myAllSubscribers{\n        id,\n    price\n    totalDays,\n    startAt,\n    lastScannedAt,\n    RemainingDay\n     allScans {\n        scannedAt\n      }\n    userId {\n        id,\n      first_name,\n      last_name,\n      number,\n      emailId\n    }\n  }\n    }\n  }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery VerifiedUserGoogle($payload: signupinput!) {\n  verifiedgoodtokenandnumberforSignup(payload: $payload) {\n    success\n    token\n    message\n  }\n  \n}\n"): (typeof documents)["\nquery VerifiedUserGoogle($payload: signupinput!) {\n  verifiedgoodtokenandnumberforSignup(payload: $payload) {\n    success\n    token\n    message\n  }\n  \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery VerifiedUsersigninGoogle($token: String!) {\n  verifiedgoodtokenandnumberforSignin(token: $token) {\n    success\n    token\n    message\n  }\n  \n}\n"): (typeof documents)["\nquery VerifiedUsersigninGoogle($token: String!) {\n  verifiedgoodtokenandnumberforSignin(token: $token) {\n    success\n    token\n    message\n  }\n  \n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetcurrentUser{\n  getcurrentUser{\n    id,\n  number,\n  first_name,\n  last_name,\n  emailId,\n  Subscriber,\n  imageUrl,\n   myMess {\n    id,\n    price,\n    RemainingDay,\n    totalDays,\n    startAt,\n    lastScannedAt\n    allScans {\n      scannedAt\n    },\n   messId {\n    id\n    identity {\n      name,\n      dietaryType,\n      operatingMode\n    },\n    location {\n      address,\n      city,\n      landmark,\n    }\n   }\n  } ,\n  Address {\n   address,\n    houseNo,\n    society,\n    landmark,\n    suburb,\n    city,\n    state,\n    postcode,\n    lat,\n    lng\n  }\n  }\n}\n\n"): (typeof documents)["\nquery GetcurrentUser{\n  getcurrentUser{\n    id,\n  number,\n  first_name,\n  last_name,\n  emailId,\n  Subscriber,\n  imageUrl,\n   myMess {\n    id,\n    price,\n    RemainingDay,\n    totalDays,\n    startAt,\n    lastScannedAt\n    allScans {\n      scannedAt\n    },\n   messId {\n    id\n    identity {\n      name,\n      dietaryType,\n      operatingMode\n    },\n    location {\n      address,\n      city,\n      landmark,\n    }\n   }\n  } ,\n  Address {\n   address,\n    houseNo,\n    society,\n    landmark,\n    suburb,\n    city,\n    state,\n    postcode,\n    lat,\n    lng\n  }\n  }\n}\n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;