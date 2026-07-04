import { GET_CURRENT_USER } from "@/graphql/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../../api_server/api_end_point"
import { GetcurrentUserQuery } from "../../src1/gql/graphql"
import { useStateContex } from "@/context/State"


export const useCurrentUser = () => {
   const query = useQuery<GetcurrentUserQuery>({
      queryKey: ["current_user"],
      queryFn: () => graphqlClient.request(GET_CURRENT_USER)
   })
   return { ...query, user: query.data?.getcurrentUser }
}


export const getMyOrder = (id: string) => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { axioseInstace } = useStateContex()
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const query = useQuery({
      queryKey: ["get-my-order", id],
      queryFn: async () => {
         const res = await axioseInstace.get(`/api/user/get-MyOrder/${id}`);
         return res.data;
      },
      enabled: !!id, // Only fetch when id exists
   });
   return {...query,myorders:query.data?.responseData}
}
export const getMyOrderForkitchen = (id: string) => {
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { axioseInstace } = useStateContex()
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const query = useQuery({
      queryKey: ["get-my-order-kitchen", id],
      queryFn: async () => {
         const res = await axioseInstace.get(`/api/user/get-MyOrder-kitchen/${id}`);
         return res.data;
      },
      enabled: !!id, // Only fetch when id exists
   });
   return {...query,myordersforKtchen:query.data?.responseData}
}