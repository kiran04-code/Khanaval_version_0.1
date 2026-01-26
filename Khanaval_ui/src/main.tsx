import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { StateContextProvider } from "./context/State.tsx";
const clinet = new QueryClient()
createRoot(document.getElementById("root")!).render(
    <StateContextProvider>
        <GoogleOAuthProvider clientId="19575799004-fe207037b8fou93toidb1461mvcrit4a.apps.googleusercontent.com">
            <QueryClientProvider client={clinet}>
                <App />
            </QueryClientProvider>
        </GoogleOAuthProvider>
    </StateContextProvider>
);
