import axios, { type AxiosInstance } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface StateContextType   {
  userlat: number | null;
  setUserLat: Dispatch<SetStateAction<number | null>>;
  userlng: number | null;
  setUserLng: Dispatch<SetStateAction<number | null>>;
  axioseInstace: AxiosInstance;
}
const StateContex = createContext<StateContextType  | null >(null)
export const StateContextProvider = ({ children }: { children: ReactNode }) => {
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                setUserLat(latitude)
                setUserLng(longitude)
            }
        )
    }, [])
    const [userlat,setUserLat] = useState<number | null>(null)
    const [userlng,setUserLng] = useState<number | null>(null)
    const baseurl = import.meta.env.VITE_BACKEND_API;
  const axioseInstace = axios.create({
        withCredentials:true,
        baseURL:baseurl,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("client_token")}`
        }
    })
    return <StateContex.Provider value={{userlat,setUserLat,userlng,setUserLng,axioseInstace}}>
        {children}
    </StateContex.Provider>
    
}

export const useStateContex = ()=>{
    return useContext(StateContex)
}