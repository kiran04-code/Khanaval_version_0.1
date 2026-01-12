/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  _dummy?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getcurrentUser?: Maybe<User>;
  verifiedgoodtokenandnumberforSignin?: Maybe<SignupResponse>;
  verifiedgoodtokenandnumberforSignup?: Maybe<SignupResponse>;
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

export type User = {
  __typename?: 'User';
  emailId: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  number?: Maybe<Scalars['String']['output']>;
};

export type Signupinput = {
  number: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type VerifiedUserGoogleQueryVariables = Exact<{
  payload: Signupinput;
}>;


export type VerifiedUserGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignup?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type VerifiedUsersigninGoogleQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifiedUsersigninGoogleQuery = { __typename?: 'Query', verifiedgoodtokenandnumberforSignin?: { __typename?: 'SignupResponse', success: boolean, token?: string | null, message?: string | null } | null };

export type GetcurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetcurrentUserQuery = { __typename?: 'Query', getcurrentUser?: { __typename?: 'User', id: string, number?: string | null, first_name: string, last_name: string, emailId: string, imageUrl: string } | null };


export const VerifiedUserGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUserGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"signupinput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>;
export const VerifiedUsersigninGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUsersigninGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>;
export const GetcurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"emailId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetcurrentUserQuery, GetcurrentUserQueryVariables>;