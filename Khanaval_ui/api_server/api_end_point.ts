import { GraphQLClient } from "graphql-request"
const isClient = typeof window !== "undefined";
const backend_url  = import.meta.env.VITE_BACKEND_API;
export const graphqlClient = new GraphQLClient(`${backend_url}/graphql`,{
    headers:()=>({
        Authorization:isClient? `Bearer${window.localStorage.getItem("_user_Token__")}` :""
    })
})
