import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface StateContextType   {
  userlat: number | null;
  setUserLat: Dispatch<SetStateAction<number | null>>;
  userlng: number | null;
  setUserLng: Dispatch<SetStateAction<number | null>>;
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
    return <StateContex.Provider value={{userlat,setUserLat,userlng,setUserLng}}>
        {children}
    </StateContex.Provider>
    
}

export const useStateContex = ()=>{
    return useContext(StateContex)
}