import { PROVIDER_CURRENT_DATA } from "@/graphql/Provider"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../../api_server/api_end_point"
import { Provider } from "src1/gql/graphql"

export const UserProviderdata = () =>{
    const query = useQuery<Provider>({
        queryKey:["provider-data"],
        queryFn:()=>graphqlClient.request(PROVIDER_CURRENT_DATA)
    })
    console.log(query)
    return {...query ,Providerdata:query.data?.getProviderdata}
}