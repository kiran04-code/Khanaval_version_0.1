import { useCurrentUser } from "@/hooks/user-hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useCurrentUser();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
};
