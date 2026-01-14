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

export type Mutation = {
  __typename?: 'Mutation';
  _dummy?: Maybe<Scalars['Boolean']['output']>;
  _dummys?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  Providerverfication?: Maybe<SignupResponseOfverifed>;
  ProviderverficationLogin?: Maybe<SignupResponseOfverifed>;
  ProviderverficationOTP?: Maybe<SignupResponseprovider>;
  ProviderverficationOTPLogin?: Maybe<SignupResponseprovider>;
  getProviderdata?: Maybe<Provider>;
  getcurrentUser?: Maybe<User>;
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

export type User = {
  __typename?: 'User';
  emailId: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  number?: Maybe<Scalars['String']['output']>;
};

export type Loginpinputp = {
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
};

export type Provider = {
  getProviderdata: any;
  __typename?: 'provider';
  MessRegister?: Maybe<Scalars['String']['output']>;
  OwnerName: Scalars['String']['output'];
  emailId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  number: Scalars['String']['output'];
};

export type Signupinput = {
  number: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Signupinputp = {
  Ownername: Scalars['String']['input'];
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
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


export const ProviderverficationOtpQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationOTPQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationOtpQueryQuery, ProviderverficationOtpQueryQueryVariables>;
export const ProviderverficationQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"signupinputp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Providerverfication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationQueryQuery, ProviderverficationQueryQueryVariables>;
export const ProviderverficationOtpQueryForLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationOTPQueryFORLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"number"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationOTPLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"number"},"value":{"kind":"Variable","name":{"kind":"Name","value":"number"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationOtpQueryForLoginQuery, ProviderverficationOtpQueryForLoginQueryVariables>;
export const ProviderverficationQueryForLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProviderverficationQueryFORLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"loginpinputp"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ProviderverficationLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<ProviderverficationQueryForLoginQuery, ProviderverficationQueryForLoginQueryVariables>;
export const GetCurrentDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProviderdata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"OwnerName"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"MessRegister"}}]}}]}}]} as unknown as DocumentNode<GetCurrentDataQuery, GetCurrentDataQueryVariables>;
export const VerifiedUserGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUserGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"signupinput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUserGoogleQuery, VerifiedUserGoogleQueryVariables>;
export const VerifiedUsersigninGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifiedUsersigninGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifiedgoodtokenandnumberforSignin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifiedUsersigninGoogleQuery, VerifiedUsersigninGoogleQueryVariables>;
export const GetcurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getcurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"emailId"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetcurrentUserQuery, GetcurrentUserQueryVariables>;
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
  _dummys?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  Providerverfication?: Maybe<SignupResponseOfverifed>;
  ProviderverficationLogin?: Maybe<SignupResponseOfverifed>;
  ProviderverficationOTP?: Maybe<SignupResponseprovider>;
  ProviderverficationOTPLogin?: Maybe<SignupResponseprovider>;
  getProviderdata?: Maybe<Provider>;
  getcurrentUser?: Maybe<User>;
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

export type User = {
  __typename?: 'User';
  emailId: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  number?: Maybe<Scalars['String']['output']>;
};

export type Loginpinputp = {
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
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
  number: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Signupinputp = {
  Ownername: Scalars['String']['input'];
  number: Scalars['String']['input'];
  otp: Scalars['Int']['input'];
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
    imageUrl
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