import { GET_CURRENT_USER } from "@/graphql/user"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../../api_server/api_end_point"
import { GetcurrentUserQuery } from "../../src1/gql/graphql"


export const useCurrentUser = ()=> {
 const query = useQuery<GetcurrentUserQuery>({
    queryKey:["current_user"],
    queryFn:()=>graphqlClient.request(GET_CURRENT_USER)
 })
 return {...query, user:query.data?.getcurrentUser}
}