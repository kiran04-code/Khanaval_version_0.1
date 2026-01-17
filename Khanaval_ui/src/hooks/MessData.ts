        import { useQuery } from "@tanstack/react-query"
        import axios from "axios"

        export const GetALLmess = ()=>{
            const query = useQuery({
                queryKey:["GET_ALL_MESS"],
                queryFn:async()=> {
                    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/getallMess`)
                    return res.data
                }
            })
            
            return {...query,AllMESS:query?.data?.allmess || []}
        }