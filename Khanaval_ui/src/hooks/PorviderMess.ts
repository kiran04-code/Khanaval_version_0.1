import { CREATE_MESS_FOR_PROVIDER, GET_MY_MESS } from "@/graphql/Provider"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphqlClient, providerGraphqlClient } from "../../api_server/api_end_point"
import { CreateMessdata, GetCurrentMess } from "src1/gql/graphql"
import { GET_CURRENT_USER } from "@/graphql/user"

export const CreatemessForProvider = () => {
    const queryclient = useQueryClient()
    const result = useMutation({
        mutationFn: (payload: CreateMessdata) =>
            graphqlClient.request(CREATE_MESS_FOR_PROVIDER, { payload }),
            onSuccess:()=>queryclient.invalidateQueries({queryKey:["get-mess"]})
    })
    return result
}

export const Getmymess = () => {
    const query = useQuery({
        queryKey: ["get-mess"],
        queryFn: () => providerGraphqlClient.request(GET_MY_MESS),
    })
    
    return { ...query, messdata: query.data?.getproviderMessData }
}