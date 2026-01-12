import { useCurrentUser } from "@/hooks/user-hook"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useEffect } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoutes = ({children}:{children:ReactNode})=>{
 const { user } = useCurrentUser();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}