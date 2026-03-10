/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMessdata = {
  identity?: InputMaybe<Identity>;
  legal: Legal;
  location: Location;
  media: Media;
  providerId: Scalars['String']['input'];
};

export type GetCurrentMess = {
  __typename?: 'GetCurrentMess';
  Menu?: Maybe<Array<Maybe<Menu>>>;
  MessQrcode: Scalars['String']['output'];
  MontlyPrices?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identity: Identitys;
  legal: Legals;
  location: Locations;
  media: Medias;
  messVerified: Scalars['Boolean']['output'];
  myAllSubscribers?: Maybe<Array<Maybe<SubscriberforMess>>>;
  myAllSubscribersRequest?: Maybe<Array<Maybe<SubscribersRequest>>>;
};

export type Identity = {
  dietaryType: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  operatingMode?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
};

export type Identitys = {
  __typename?: 'Identitys';
  dietaryType: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  operatingMode?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
};

export type Legal = {
  fssaiNumber: Scalars['String']['input'];
};

export type Legals = {
  __typename?: 'Legals';
  fssaiNumber: Scalars['String']['output'];
};

export type Location = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  houseNo: Scalars['String']['input'];
  landmark: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  postcode: Scalars['String']['input'];
  society: Scalars['String']['input'];
  state: Scalars['String']['input'];
  suburb?: InputMaybe<Scalars['String']['input']>;
};

export type Locations = {
  __typename?: 'Locations';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  houseNo: Scalars['String']['output'];
  landmark: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  postcode: Scalars['String']['output'];
  society: Scalars['String']['output'];
  state: Scalars['String']['output'];
  suburb?: Maybe<Scalars['String']['output']>;
};

export type Media = {
  cover: Scalars['String']['input'];
  dining: Scalars['String']['input'];
  kitchen: Scalars['String']['input'];
};

export type Medias = {
  __typename?: 'Medias';
  cover: Scalars['String']['output'];
  dining: Scalars['String']['output'];
  kitchen: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateMessProvider: SignupResponseprovider;
  _dummy?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateMessProviderArgs = {
  payload: CreateMessdata;
};

export type Query = {
  __typename?: 'Query';
  Providerverfication?: Maybe<SignupResponseOfverifed>;
  ProviderverficationLogin?: Maybe<SignupResponseOfverifed>;
  ProviderverficationOTP?: Maybe<SignupResponseprovider>;
  ProviderverficationOTPLogin?: Maybe<SignupResponseprovider>;
  getProviderdata?: Maybe<Provider>;
  getcurrentUser?: Maybe<User>;
  getproviderMessData?: Maybe<GetCurrentMess>;
  verifiedgoodtokenandnumberforSignin?: Maybe<SignupResponse>;
  verifiedgoodtokenandnumberforSignup?: Maybe<SignupResponse>;
};


export type QueryProviderverficationArgs = {
  payload: Signupinputp;
};


export type QueryProviderverficationLoginArgs = {
  payload: Loginpinputp;
};


export type QueryProviderverficationOtpArgs = {
  number: Scalars['String']['input'];
};


export type QueryProviderverficationOtpLoginArgs = {
  number: Scalars['String']['input'];
};


export type QueryVerifiedgoodtokenandnumberforSigninArgs = {
  token: Scalars['String']['input'];
};


export type QueryVerifiedgoodtokenandnumberforSignupArgs = {
  payload: Signupinput;
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupResponseOfverifed = {
  __typename?: 'SignupResponseOfverifed';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupResponseprovider = {
  __typename?: 'SignupResponseprovider';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Subscriber = {
  __typename?: 'Subscriber';
  RemainingDay: Scalars['Int']['output'];
  allScans?: Maybe<Array<Maybe<Subscannerlatest>>>;
  id: Scalars['ID']['output'];
  lastScannedAt?: Maybe<Scalars['String']['output']>;
  messId?: Maybe<GetCurrentMess>;
  price: Scalars['Int']['output'];
  startAt?: Maybe<Scalars['String']['output']>;
  totalDays: Scalars['Int']['output'];
};

export type SubscriberforMess = {
  __typename?: 'SubscriberforMess';
  RemainingDay?: Maybe<Scalars['Int']['output']>;
  allScans?: Maybe<Array<Maybe<Subscannerlatest>>>;
  id: Scalars['ID']['output'];
  lastScannedAt?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  startAt?: Maybe<Scalars['String']['output']>;
  totalDays: Scalars['Int']['output'];
  userId?: Maybe<User>;
};

export type SubscribersRequest = {
  __typename?: 'SubscribersRequest';
  phoneNumber: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  Subscriber: Scalars['Boolean']['output'];
  emailId: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  myMess?: Maybe<Subscriber>;
  number?: Maybe<Scalars['String']['output']>;
};

export type Loginpinputp = {
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Menu = {
  __typename?: 'menu';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  menuText?: Maybe<Scalars['String']['output']>;
  types?: Maybe<Scalars['String']['output']>;
};

export type Provider = {
  __typename?: 'provider';
  MessRegister?: Maybe<Scalars['String']['output']>;
  OwnerName: Scalars['String']['output'];
  emailId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
};

export type Signupinput = {
  FCMtoken: Scalars['String']['input'];
  number: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Signupinputp = {
  FCMtoken?: InputMaybe<Scalars['String']['input']>;
  Ownername: Scalars['String']['input'];
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Subscannerlatest = {
  __typename?: 'subscannerlatest';
  scannedAt?: Maybe<Scalars['String']['output']>;
};

export type ProviderverficationOtpQueryQueryVariables = Exact<{
  number: Scalars['String']['input'];
}>;


export type ProviderverficationOtpQueryQuery = { __typename?: 'Query', ProviderverficationOTP?: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } | null };

export type ProviderverficationQueryQueryVariables = Exact<{
  payload: Signupinputp;
}>;


export type ProviderverficationQueryQuery = { __typename?: 'Query', Providerverfication?: { __typename?: 'SignupResponseOfverifed', success: boolean, message?: string | null, token?: string | null } | null };

export type ProviderverficationOtpQueryForLoginQueryVariables = Exact<{
  number: Scalars['String']['input'];
}>;


export type ProviderverficationOtpQueryForLoginQuery = { __typename?: 'Query', ProviderverficationOTPLogin?: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } | null };

export type ProviderverficationQueryForLoginQueryVariables = Exact<{
  payload: Loginpinputp;
}>;


export type ProviderverficationQueryForLoginQuery = { __typename?: 'Query', ProviderverficationLogin?: { __typename?: 'SignupResponseOfverifed', success: boolean, message?: string | null, token?: string | null } | null };

export type GetCurrentDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentDataQuery = { __typename?: 'Query', getProviderdata?: { __typename?: 'provider', id: string, OwnerName: string, number: string, MessRegister?: string | null } | null };

export type CreatemesforproviderMutationVariables = Exact<{
  payload: CreateMessdata;
}>;


export type CreatemesforproviderMutation = { __typename?: 'Mutation', CreateMessProvider: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } };

export type GetcurentMessdataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcurentMessdataQuery = { __typename?: 'Query', getproviderMessData?: { __typename?: 'GetCurrentMess', id: string, MontlyPrices?: number | null, messVerified: boolean, createdAt: string, MessQrcode: string, identity: { __typename?: 'Identitys', name: string, startTime: string, endTime: string, dietaryType: string, operatingMode?: string | null }, legal: { __typename?: 'Legals', fssaiNumber: string }, media: { __typename?: 'Medias', cover: string, kitchen: string, dining: string }, location: { __typename?: 'Locations', address: string, houseNo: string, society: string, landmark: string, suburb?: string | null, city: string, state: string, postcode: string, lat: number, lng: number }, myAllSubscribersRequest?: Array<{ __typename?: 'SubscribersRequest', userName: string, phoneNumber: string } | null> | null, Menu?: Array<{ __typename?: 'menu', _id?: string | null, types?: string | null, imageUrl?: string | null, createdAt?: string | null, menuText?: string | null } | null> | null, myAllSubscribers?: Array<{ __typename?: 'SubscriberforMess', id: string, price: number, totalDays: number, startAt?: string | null, lastScannedAt?: string | null, RemainingDay?: number | null, allScans?: Array<{ __typename?: 'subscannerlatest', scannedAt?: string | null } | null> | null, userId?: { __typename?: 'User', id: string, first_name: string, last_name: string, number?: string | null, emailId: string } | null } | null> | null } | null };

export type VerifiedUserGoogleQueryVariables = Exact<{
  payload: Signupinput;
}>;


export type VerifiedUserGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignup?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type VerifiedUsersigninGoogleQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifiedUsersigninGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignin?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type GetcurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcurrentUserQuery = { __typename?: 'Query', getcurrentUser?: { __typename?: 'User', id: string, number?: string | null, first_name: string, last_name: string, emailId: string, Subscriber: boolean, imageUrl: string, myMess?: { __typename?: 'Subscriber', id: string, price: number, RemainingDay: number, totalDays: number, startAt?: string | null, lastScannedAt?: string | null, allScans?: Array<{ __typename?: 'subscannerlatest', scannedAt?: string | null } | null> | null, messId?: {
    _id(_id: any): unknown; __typename?: 'GetCurrentMess', id: string, identity: { __typename?: 'Identitys', name: string, dietaryType: string, operatingMode?: string | null }, location: { __typename?: 'Locations', address: string, city: string, landmark: string } 
} | null } | null } | null };


export const ProviderverficationOtpQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationOTPQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>;
export const ProviderverficationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"signupinputp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Providerverfication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>;
export const ProviderverficationOtpQueryForLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationOTPQueryFORLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationOTPLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>;
export const ProviderverficationQueryForLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationQueryFORLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"loginpinputp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>;
export const GetCurrentDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProviderdata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"OwnerName"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"MessRegister"}}]}}]}}]} as unknown as DocumentNode<GetCurrentDataQuery, GetCurrentDataQueryVariables>;
export const CreatemesforproviderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Createmesforprovider"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessdata"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreateMessProvider"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CreatemesforproviderMutation, CreatemesforproviderMutationVariables>;
export const GetcurentMessdataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcurentMessdata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getproviderMessData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"MontlyPrices"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryType"}},{"kind":"Field","name":{"kind":"Name","value":"operatingMode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"legal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fssaiNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"kitchen"}},{"kind":"Field","name":{"kind":"Name","value":"dining"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"houseNo"}},{"kind":"Field","name":{"kind":"Name","value":"society"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}},{"kind":"Field","name":{"kind":"Name","value":"suburb"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postcode"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messVerified"}},{"kind":"Field","name":{"kind":"Name","value":"myAllSubscribersRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"MessQrcode"}},{"kind":"Field","name":{"kind":"Name","value":"Menu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"menuText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myAllSubscribers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"RemainingDay"}},{"kind":"Field","name":{"kind":"Name","value":"allScans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scannedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"emailId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>;
export const VerifiedUserGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUserGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"signupinput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>;
export const VerifiedUsersigninGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUsersigninGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>;
export const GetcurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"emailId"}},{"kind":"Field","name":{"kind":"Name","value":"Subscriber"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"myMess"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"RemainingDay"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastScannedAt"}},{"kind":"Field","name":{"kind":"Name","value":"allScans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scannedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryType"}},{"kind":"Field","name":{"kind":"Name","value":"operatingMode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"landmark"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetcurrentUserQuery, GetcurrentUserQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateMessdata = {
  identity?: InputMaybe<Identity>;
  legal: Legal;
  location: Location;
  media: Media;
  providerId: Scalars['String']['input'];
};

export type GetCurrentMess = {
  __typename?: 'GetCurrentMess';
  Menu?: Maybe<Array<Maybe<Menu>>>;
  MessQrcode: Scalars['String']['output'];
  MontlyPrices?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  identity: Identitys;
  legal: Legals;
  location: Locations;
  media: Medias;
  messVerified: Scalars['Boolean']['output'];
  myAllSubscribers?: Maybe<Array<Maybe<SubscriberforMess>>>;
  myAllSubscribersRequest?: Maybe<Array<Maybe<SubscribersRequest>>>;
};

export type Identity = {
  dietaryType: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  name: Scalars['String']['input'];
  operatingMode?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
};

export type Identitys = {
  __typename?: 'Identitys';
  dietaryType: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  operatingMode?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['String']['output'];
};

export type Legal = {
  fssaiNumber: Scalars['String']['input'];
};

export type Legals = {
  __typename?: 'Legals';
  fssaiNumber: Scalars['String']['output'];
};

export type Location = {
  address: Scalars['String']['input'];
  city: Scalars['String']['input'];
  houseNo: Scalars['String']['input'];
  landmark: Scalars['String']['input'];
  lat: Scalars['Float']['input'];
  lng: Scalars['Float']['input'];
  postcode: Scalars['String']['input'];
  society: Scalars['String']['input'];
  state: Scalars['String']['input'];
  suburb?: InputMaybe<Scalars['String']['input']>;
};

export type Locations = {
  __typename?: 'Locations';
  address: Scalars['String']['output'];
  city: Scalars['String']['output'];
  houseNo: Scalars['String']['output'];
  landmark: Scalars['String']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  postcode: Scalars['String']['output'];
  society: Scalars['String']['output'];
  state: Scalars['String']['output'];
  suburb?: Maybe<Scalars['String']['output']>;
};

export type Media = {
  cover: Scalars['String']['input'];
  dining: Scalars['String']['input'];
  kitchen: Scalars['String']['input'];
};

export type Medias = {
  __typename?: 'Medias';
  cover: Scalars['String']['output'];
  dining: Scalars['String']['output'];
  kitchen: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateMessProvider: SignupResponseprovider;
  _dummy?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateMessProviderArgs = {
  payload: CreateMessdata;
};

export type Query = {
  __typename?: 'Query';
  Providerverfication?: Maybe<SignupResponseOfverifed>;
  ProviderverficationLogin?: Maybe<SignupResponseOfverifed>;
  ProviderverficationOTP?: Maybe<SignupResponseprovider>;
  ProviderverficationOTPLogin?: Maybe<SignupResponseprovider>;
  getProviderdata?: Maybe<Provider>;
  getcurrentUser?: Maybe<User>;
  getproviderMessData?: Maybe<GetCurrentMess>;
  verifiedgoodtokenandnumberforSignin?: Maybe<SignupResponse>;
  verifiedgoodtokenandnumberforSignup?: Maybe<SignupResponse>;
};


export type QueryProviderverficationArgs = {
  payload: Signupinputp;
};


export type QueryProviderverficationLoginArgs = {
  payload: Loginpinputp;
};


export type QueryProviderverficationOtpArgs = {
  number: Scalars['String']['input'];
};


export type QueryProviderverficationOtpLoginArgs = {
  number: Scalars['String']['input'];
};


export type QueryVerifiedgoodtokenandnumberforSigninArgs = {
  token: Scalars['String']['input'];
};


export type QueryVerifiedgoodtokenandnumberforSignupArgs = {
  payload: Signupinput;
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupResponseOfverifed = {
  __typename?: 'SignupResponseOfverifed';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type SignupResponseprovider = {
  __typename?: 'SignupResponseprovider';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Subscriber = {
  __typename?: 'Subscriber';
  RemainingDay: Scalars['Int']['output'];
  allScans?: Maybe<Array<Maybe<Subscannerlatest>>>;
  id: Scalars['ID']['output'];
  lastScannedAt?: Maybe<Scalars['String']['output']>;
  messId?: Maybe<GetCurrentMess>;
  price: Scalars['Int']['output'];
  startAt?: Maybe<Scalars['String']['output']>;
  totalDays: Scalars['Int']['output'];
};

export type SubscriberforMess = {
  __typename?: 'SubscriberforMess';
  RemainingDay?: Maybe<Scalars['Int']['output']>;
  allScans?: Maybe<Array<Maybe<Subscannerlatest>>>;
  id: Scalars['ID']['output'];
  lastScannedAt?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  startAt?: Maybe<Scalars['String']['output']>;
  totalDays: Scalars['Int']['output'];
  userId?: Maybe<User>;
};

export type SubscribersRequest = {
  __typename?: 'SubscribersRequest';
  phoneNumber: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  Subscriber: Scalars['Boolean']['output'];
  emailId: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  myMess?: Maybe<Subscriber>;
  number?: Maybe<Scalars['String']['output']>;
};

export type Loginpinputp = {
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Menu = {
  __typename?: 'menu';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  menuText?: Maybe<Scalars['String']['output']>;
  types?: Maybe<Scalars['String']['output']>;
};

export type Provider = {
  __typename?: 'provider';
  MessRegister?: Maybe<Scalars['String']['output']>;
  OwnerName: Scalars['String']['output'];
  emailId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
};

export type Signupinput = {
  FCMtoken: Scalars['String']['input'];
  number: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Signupinputp = {
  FCMtoken?: InputMaybe<Scalars['String']['input']>;
  Ownername: Scalars['String']['input'];
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Subscannerlatest = {
  __typename?: 'subscannerlatest';
  scannedAt?: Maybe<Scalars['String']['output']>;
};

export type ProviderverficationOtpQueryQueryVariables = Exact<{
  number: Scalars['String']['input'];
}>;


export type ProviderverficationOtpQueryQuery = { __typename?: 'Query', ProviderverficationOTP?: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } | null };

export type ProviderverficationQueryQueryVariables = Exact<{
  payload: Signupinputp;
}>;


export type ProviderverficationQueryQuery = { __typename?: 'Query', Providerverfication?: { __typename?: 'SignupResponseOfverifed', success: boolean, message?: string | null, token?: string | null } | null };

export type ProviderverficationOtpQueryForLoginQueryVariables = Exact<{
  number: Scalars['String']['input'];
}>;


export type ProviderverficationOtpQueryForLoginQuery = { __typename?: 'Query', ProviderverficationOTPLogin?: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } | null };

export type ProviderverficationQueryForLoginQueryVariables = Exact<{
  payload: Loginpinputp;
}>;


export type ProviderverficationQueryForLoginQuery = { __typename?: 'Query', ProviderverficationLogin?: { __typename?: 'SignupResponseOfverifed', success: boolean, message?: string | null, token?: string | null } | null };

export type GetCurrentDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentDataQuery = { __typename?: 'Query', getProviderdata?: { __typename?: 'provider', id: string, OwnerName: string, number: string, MessRegister?: string | null } | null };

export type CreatemesforproviderMutationVariables = Exact<{
  payload: CreateMessdata;
}>;


export type CreatemesforproviderMutation = { __typename?: 'Mutation', CreateMessProvider: { __typename?: 'SignupResponseprovider', success: boolean, message?: string | null } };

export type GetcurentMessdataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcurentMessdataQuery = { __typename?: 'Query', getproviderMessData?: { __typename?: 'GetCurrentMess', id: string, MontlyPrices?: number | null, messVerified: boolean, createdAt: string, MessQrcode: string, identity: { __typename?: 'Identitys', name: string, startTime: string, endTime: string, dietaryType: string, operatingMode?: string | null }, legal: { __typename?: 'Legals', fssaiNumber: string }, media: { __typename?: 'Medias', cover: string, kitchen: string, dining: string }, location: { __typename?: 'Locations', address: string, houseNo: string, society: string, landmark: string, suburb?: string | null, city: string, state: string, postcode: string, lat: number, lng: number }, myAllSubscribersRequest?: Array<{ __typename?: 'SubscribersRequest', userName: string, phoneNumber: string } | null> | null, Menu?: Array<{ __typename?: 'menu', _id?: string | null, types?: string | null, imageUrl?: string | null, createdAt?: string | null, menuText?: string | null } | null> | null, myAllSubscribers?: Array<{ __typename?: 'SubscriberforMess', id: string, price: number, totalDays: number, startAt?: string | null, lastScannedAt?: string | null, RemainingDay?: number | null, allScans?: Array<{ __typename?: 'subscannerlatest', scannedAt?: string | null } | null> | null, userId?: { __typename?: 'User', id: string, first_name: string, last_name: string, number?: string | null, emailId: string } | null } | null> | null } | null };

export type VerifiedUserGoogleQueryVariables = Exact<{
  payload: Signupinput;
}>;


export type VerifiedUserGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignup?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type VerifiedUsersigninGoogleQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifiedUsersigninGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignin?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type GetcurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcurrentUserQuery = { __typename?: 'Query', getcurrentUser?: { __typename?: 'User', id: string, number?: string | null, first_name: string, last_name: string, emailId: string, Subscriber: boolean, imageUrl: string, myMess?: { __typename?: 'Subscriber', id: string, price: number, RemainingDay: number, totalDays: number, startAt?: string | null, lastScannedAt?: string | null, allScans?: Array<{ __typename?: 'subscannerlatest', scannedAt?: string | null } | null> | null, messId?: { __typename?: 'GetCurrentMess', id: string, identity: { __typename?: 'Identitys', name: string, dietaryType: string, operatingMode?: string | null }, location: { __typename?: 'Locations', address: string, city: string, landmark: string } } | null } | null } | null };


export const ProviderverficationOtpQueryDocument = gql`
    query ProviderverficationOTPQuery($number: String!) {
  ProviderverficationOTP(number: $number) {
    success
    message
  }
}
    `;

/**
 * __useProviderverficationOtpQueryQuery__
 *
 * To run a query within a React component, call `useProviderverficationOtpQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderverficationOtpQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderverficationOtpQueryQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useProviderverficationOtpQueryQuery(baseOptions: Apollo.QueryHookOptions<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables> & ({ variables: ProviderverficationOtpQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>(ProviderverficationOtpQueryDocument, options);
      }
export function useProviderverficationOtpQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>(ProviderverficationOtpQueryDocument, options);
        }
// @ts-ignore
export function useProviderverficationOtpQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>;
export function useProviderverficationOtpQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationOtpQueryQuery | undefined, ProviderverficationOtpQueryQueryVariables>;
export function useProviderverficationOtpQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>(ProviderverficationOtpQueryDocument, options);
        }
export type ProviderverficationOtpQueryQueryHookResult = ReturnType<typeof useProviderverficationOtpQueryQuery>;
export type ProviderverficationOtpQueryLazyQueryHookResult = ReturnType<typeof useProviderverficationOtpQueryLazyQuery>;
export type ProviderverficationOtpQuerySuspenseQueryHookResult = ReturnType<typeof useProviderverficationOtpQuerySuspenseQuery>;
export type ProviderverficationOtpQueryQueryResult = Apollo.QueryResult<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>;
export const ProviderverficationQueryDocument = gql`
    query ProviderverficationQuery($payload: signupinputp!) {
  Providerverfication(payload: $payload) {
    success
    message
    token
  }
}
    `;

/**
 * __useProviderverficationQueryQuery__
 *
 * To run a query within a React component, call `useProviderverficationQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderverficationQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderverficationQueryQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useProviderverficationQueryQuery(baseOptions: Apollo.QueryHookOptions<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables> & ({ variables: ProviderverficationQueryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>(ProviderverficationQueryDocument, options);
      }
export function useProviderverficationQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>(ProviderverficationQueryDocument, options);
        }
// @ts-ignore
export function useProviderverficationQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>;
export function useProviderverficationQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationQueryQuery | undefined, ProviderverficationQueryQueryVariables>;
export function useProviderverficationQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>(ProviderverficationQueryDocument, options);
        }
export type ProviderverficationQueryQueryHookResult = ReturnType<typeof useProviderverficationQueryQuery>;
export type ProviderverficationQueryLazyQueryHookResult = ReturnType<typeof useProviderverficationQueryLazyQuery>;
export type ProviderverficationQuerySuspenseQueryHookResult = ReturnType<typeof useProviderverficationQuerySuspenseQuery>;
export type ProviderverficationQueryQueryResult = Apollo.QueryResult<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>;
export const ProviderverficationOtpQueryForLoginDocument = gql`
    query ProviderverficationOTPQueryFORLogin($number: String!) {
  ProviderverficationOTPLogin(number: $number) {
    success
    message
  }
}
    `;

/**
 * __useProviderverficationOtpQueryForLoginQuery__
 *
 * To run a query within a React component, call `useProviderverficationOtpQueryForLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderverficationOtpQueryForLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderverficationOtpQueryForLoginQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useProviderverficationOtpQueryForLoginQuery(baseOptions: Apollo.QueryHookOptions<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables> & ({ variables: ProviderverficationOtpQueryForLoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>(ProviderverficationOtpQueryForLoginDocument, options);
      }
export function useProviderverficationOtpQueryForLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>(ProviderverficationOtpQueryForLoginDocument, options);
        }
// @ts-ignore
export function useProviderverficationOtpQueryForLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>;
export function useProviderverficationOtpQueryForLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationOtpQueryForLoginQuery | undefined, ProviderverficationOtpQueryForLoginQueryVariables>;
export function useProviderverficationOtpQueryForLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>(ProviderverficationOtpQueryForLoginDocument, options);
        }
export type ProviderverficationOtpQueryForLoginQueryHookResult = ReturnType<typeof useProviderverficationOtpQueryForLoginQuery>;
export type ProviderverficationOtpQueryForLoginLazyQueryHookResult = ReturnType<typeof useProviderverficationOtpQueryForLoginLazyQuery>;
export type ProviderverficationOtpQueryForLoginSuspenseQueryHookResult = ReturnType<typeof useProviderverficationOtpQueryForLoginSuspenseQuery>;
export type ProviderverficationOtpQueryForLoginQueryResult = Apollo.QueryResult<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>;
export const ProviderverficationQueryForLoginDocument = gql`
    query ProviderverficationQueryFORLogin($payload: loginpinputp!) {
  ProviderverficationLogin(payload: $payload) {
    success
    message
    token
  }
}
    `;

/**
 * __useProviderverficationQueryForLoginQuery__
 *
 * To run a query within a React component, call `useProviderverficationQueryForLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderverficationQueryForLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderverficationQueryForLoginQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useProviderverficationQueryForLoginQuery(baseOptions: Apollo.QueryHookOptions<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables> & ({ variables: ProviderverficationQueryForLoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>(ProviderverficationQueryForLoginDocument, options);
      }
export function useProviderverficationQueryForLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>(ProviderverficationQueryForLoginDocument, options);
        }
// @ts-ignore
export function useProviderverficationQueryForLoginSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>;
export function useProviderverficationQueryForLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>): Apollo.UseSuspenseQueryResult<ProviderverficationQueryForLoginQuery | undefined, ProviderverficationQueryForLoginQueryVariables>;
export function useProviderverficationQueryForLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>(ProviderverficationQueryForLoginDocument, options);
        }
export type ProviderverficationQueryForLoginQueryHookResult = ReturnType<typeof useProviderverficationQueryForLoginQuery>;
export type ProviderverficationQueryForLoginLazyQueryHookResult = ReturnType<typeof useProviderverficationQueryForLoginLazyQuery>;
export type ProviderverficationQueryForLoginSuspenseQueryHookResult = ReturnType<typeof useProviderverficationQueryForLoginSuspenseQuery>;
export type ProviderverficationQueryForLoginQueryResult = Apollo.QueryResult<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>;
export const GetCurrentDataDocument = gql`
    query GetCurrentData {
  getProviderdata {
    id
    OwnerName
    number
    MessRegister
  }
}
    `;

/**
 * __useGetCurrentDataQuery__
 *
 * To run a query within a React component, call `useGetCurrentDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentDataQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentDataQuery, GetCurrentDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentDataQuery, GetCurrentDataQueryVariables>(GetCurrentDataDocument, options);
      }
export function useGetCurrentDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentDataQuery, GetCurrentDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentDataQuery, GetCurrentDataQueryVariables>(GetCurrentDataDocument, options);
        }
// @ts-ignore
export function useGetCurrentDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCurrentDataQuery, GetCurrentDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentDataQuery, GetCurrentDataQueryVariables>;
export function useGetCurrentDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentDataQuery, GetCurrentDataQueryVariables>): Apollo.UseSuspenseQueryResult<GetCurrentDataQuery | undefined, GetCurrentDataQueryVariables>;
export function useGetCurrentDataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentDataQuery, GetCurrentDataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentDataQuery, GetCurrentDataQueryVariables>(GetCurrentDataDocument, options);
        }
export type GetCurrentDataQueryHookResult = ReturnType<typeof useGetCurrentDataQuery>;
export type GetCurrentDataLazyQueryHookResult = ReturnType<typeof useGetCurrentDataLazyQuery>;
export type GetCurrentDataSuspenseQueryHookResult = ReturnType<typeof useGetCurrentDataSuspenseQuery>;
export type GetCurrentDataQueryResult = Apollo.QueryResult<GetCurrentDataQuery, GetCurrentDataQueryVariables>;
export const CreatemesforproviderDocument = gql`
    mutation Createmesforprovider($payload: CreateMessdata!) {
  CreateMessProvider(payload: $payload) {
    success
    message
  }
}
    `;
export type CreatemesforproviderMutationFn = Apollo.MutationFunction<CreatemesforproviderMutation, CreatemesforproviderMutationVariables>;

/**
 * __useCreatemesforproviderMutation__
 *
 * To run a mutation, you first call `useCreatemesforproviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatemesforproviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createmesforproviderMutation, { data, loading, error }] = useCreatemesforproviderMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreatemesforproviderMutation(baseOptions?: Apollo.MutationHookOptions<CreatemesforproviderMutation, CreatemesforproviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatemesforproviderMutation, CreatemesforproviderMutationVariables>(CreatemesforproviderDocument, options);
      }
export type CreatemesforproviderMutationHookResult = ReturnType<typeof useCreatemesforproviderMutation>;
export type CreatemesforproviderMutationResult = Apollo.MutationResult<CreatemesforproviderMutation>;
export type CreatemesforproviderMutationOptions = Apollo.BaseMutationOptions<CreatemesforproviderMutation, CreatemesforproviderMutationVariables>;
export const GetcurentMessdataDocument = gql`
    query GetcurentMessdata {
  getproviderMessData {
    id
    MontlyPrices
    identity {
      name
      startTime
      endTime
      dietaryType
      operatingMode
    }
    legal {
      fssaiNumber
    }
    media {
      cover
      kitchen
      dining
    }
    location {
      address
      houseNo
      society
      landmark
      suburb
      city
      state
      postcode
      lat
      lng
    }
    messVerified
    myAllSubscribersRequest {
      userName
      phoneNumber
    }
    createdAt
    MessQrcode
    Menu {
      _id
      types
      imageUrl
      createdAt
      menuText
    }
    myAllSubscribers {
      id
      price
      totalDays
      startAt
      lastScannedAt
      RemainingDay
      allScans {
        scannedAt
      }
      userId {
        id
        first_name
        last_name
        number
        emailId
      }
    }
  }
}
    `;

/**
 * __useGetcurentMessdataQuery__
 *
 * To run a query within a React component, call `useGetcurentMessdataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetcurentMessdataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetcurentMessdataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetcurentMessdataQuery(baseOptions?: Apollo.QueryHookOptions<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>(GetcurentMessdataDocument, options);
      }
export function useGetcurentMessdataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>(GetcurentMessdataDocument, options);
        }
// @ts-ignore
export function useGetcurentMessdataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>): Apollo.UseSuspenseQueryResult<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>;
export function useGetcurentMessdataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>): Apollo.UseSuspenseQueryResult<GetcurentMessdataQuery | undefined, GetcurentMessdataQueryVariables>;
export function useGetcurentMessdataSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>(GetcurentMessdataDocument, options);
        }
export type GetcurentMessdataQueryHookResult = ReturnType<typeof useGetcurentMessdataQuery>;
export type GetcurentMessdataLazyQueryHookResult = ReturnType<typeof useGetcurentMessdataLazyQuery>;
export type GetcurentMessdataSuspenseQueryHookResult = ReturnType<typeof useGetcurentMessdataSuspenseQuery>;
export type GetcurentMessdataQueryResult = Apollo.QueryResult<GetcurentMessdataQuery, GetcurentMessdataQueryVariables>;
export const VerifiedUserGoogleDocument = gql`
    query VerifiedUserGoogle($payload: signupinput!) {
  verifiedgoodtokenandnumberforSignup(payload: $payload) {
    success
    token
    message
  }
}
    `;

/**
 * __useVerifiedUserGoogleQuery__
 *
 * To run a query within a React component, call `useVerifiedUserGoogleQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifiedUserGoogleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifiedUserGoogleQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useVerifiedUserGoogleQuery(baseOptions: Apollo.QueryHookOptions<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables> & ({ variables: VerifiedUserGoogleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>(VerifiedUserGoogleDocument, options);
      }
export function useVerifiedUserGoogleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>(VerifiedUserGoogleDocument, options);
        }
// @ts-ignore
export function useVerifiedUserGoogleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>): Apollo.UseSuspenseQueryResult<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>;
export function useVerifiedUserGoogleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>): Apollo.UseSuspenseQueryResult<VerifiedUserGoogleQuery | undefined, VerifiedUserGoogleQueryVariables>;
export function useVerifiedUserGoogleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>(VerifiedUserGoogleDocument, options);
        }
export type VerifiedUserGoogleQueryHookResult = ReturnType<typeof useVerifiedUserGoogleQuery>;
export type VerifiedUserGoogleLazyQueryHookResult = ReturnType<typeof useVerifiedUserGoogleLazyQuery>;
export type VerifiedUserGoogleSuspenseQueryHookResult = ReturnType<typeof useVerifiedUserGoogleSuspenseQuery>;
export type VerifiedUserGoogleQueryResult = Apollo.QueryResult<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>;
export const VerifiedUsersigninGoogleDocument = gql`
    query VerifiedUsersigninGoogle($token: String!) {
  verifiedgoodtokenandnumberforSignin(token: $token) {
    success
    token
    message
  }
}
    `;

/**
 * __useVerifiedUsersigninGoogleQuery__
 *
 * To run a query within a React component, call `useVerifiedUsersigninGoogleQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifiedUsersigninGoogleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifiedUsersigninGoogleQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifiedUsersigninGoogleQuery(baseOptions: Apollo.QueryHookOptions<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables> & ({ variables: VerifiedUsersigninGoogleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>(VerifiedUsersigninGoogleDocument, options);
      }
export function useVerifiedUsersigninGoogleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>(VerifiedUsersigninGoogleDocument, options);
        }
// @ts-ignore
export function useVerifiedUsersigninGoogleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>): Apollo.UseSuspenseQueryResult<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>;
export function useVerifiedUsersigninGoogleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>): Apollo.UseSuspenseQueryResult<VerifiedUsersigninGoogleQuery | undefined, VerifiedUsersigninGoogleQueryVariables>;
export function useVerifiedUsersigninGoogleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>(VerifiedUsersigninGoogleDocument, options);
        }
export type VerifiedUsersigninGoogleQueryHookResult = ReturnType<typeof useVerifiedUsersigninGoogleQuery>;
export type VerifiedUsersigninGoogleLazyQueryHookResult = ReturnType<typeof useVerifiedUsersigninGoogleLazyQuery>;
export type VerifiedUsersigninGoogleSuspenseQueryHookResult = ReturnType<typeof useVerifiedUsersigninGoogleSuspenseQuery>;
export type VerifiedUsersigninGoogleQueryResult = Apollo.QueryResult<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>;
export const GetcurrentUserDocument = gql`
    query GetcurrentUser {
  getcurrentUser {
    id
    number
    first_name
    last_name
    emailId
    Subscriber
    imageUrl
    myMess {
      id
      price
      RemainingDay
      totalDays
      startAt
      lastScannedAt
      allScans {
        scannedAt
      }
      messId {
        id
        identity {
          name
          dietaryType
          operatingMode
        }
        location {
          address
          city
          landmark
        }
      }
    }
  }
}
    `;

/**
 * __useGetcurrentUserQuery__
 *
 * To run a query within a React component, call `useGetcurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetcurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetcurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetcurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetcurrentUserQuery, GetcurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetcurrentUserQuery, GetcurrentUserQueryVariables>(GetcurrentUserDocument, options);
      }
export function useGetcurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetcurrentUserQuery, GetcurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetcurrentUserQuery, GetcurrentUserQueryVariables>(GetcurrentUserDocument, options);
        }
// @ts-ignore
export function useGetcurrentUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetcurrentUserQuery, GetcurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetcurrentUserQuery, GetcurrentUserQueryVariables>;
export function useGetcurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetcurrentUserQuery, GetcurrentUserQueryVariables>): Apollo.UseSuspenseQueryResult<GetcurrentUserQuery | undefined, GetcurrentUserQueryVariables>;
export function useGetcurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetcurrentUserQuery, GetcurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetcurrentUserQuery, GetcurrentUserQueryVariables>(GetcurrentUserDocument, options);
        }
export type GetcurrentUserQueryHookResult = ReturnType<typeof useGetcurrentUserQuery>;
export type GetcurrentUserLazyQueryHookResult = ReturnType<typeof useGetcurrentUserLazyQuery>;
export type GetcurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetcurrentUserSuspenseQuery>;
export type GetcurrentUserQueryResult = Apollo.QueryResult<GetcurrentUserQuery, GetcurrentUserQueryVariables>;