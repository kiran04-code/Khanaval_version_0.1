import axios, { type AxiosInstance } from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from "react";

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
    const axioseInstace = useMemo(() => {
        const instance = axios.create({
            withCredentials: true,
            baseURL: baseurl,
        });

        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("client_token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                delete config.headers.Authorization;
            }

            return config;
        });

        return instance;
    }, [baseurl]);

    return <StateContex.Provider value={{userlat,setUserLat,userlng,setUserLng,axioseInstace}}>
        {children}
    </StateContex.Provider>
    
}

export const useStateContex = ()=>{
    return useContext(StateContex)
}
