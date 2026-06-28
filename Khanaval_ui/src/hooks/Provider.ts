import { PROVIDER_CURRENT_DATA } from "@/graphql/Provider"
import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../../api_server/api_end_point"
import { Provider } from "src1/gql/graphql"

import { useStateContex } from "@/context/State"

export const UserProviderdata = () =>{
    const query = useQuery<Provider>({
        queryKey:["provider-data"],
        queryFn:()=>graphqlClient.request(PROVIDER_CURRENT_DATA)
    })
    return {...query ,Providerdata:query.data?.getProviderdata}
}
export const KitchenProviderdata = () =>{
    const {axioseInstace} = useStateContex()
    const query = useQuery({
        queryKey:["KitchenProvider-data"],
        queryFn: async ()=> await axioseInstace.get("/api/cloudkitchens/getcurrenr-onwer-cloude")
    })
    return {...query ,kitchenprovider:query.data?.data.responseData}
}
export const KitchenMessData = () =>{
    const {axioseInstace} = useStateContex()
    const query = useQuery({
        queryKey:["Kithen-data"],
        queryFn: async ()=> await axioseInstace.get("/api/cloudkitchens/getCloudKitchen")
    })
    return {...query ,KitchenMessINFO:query.data?.data.responseData}
}