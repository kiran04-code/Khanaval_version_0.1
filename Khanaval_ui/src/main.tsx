import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {GoogleOAuthProvider} from "@react-oauth/google"
const clinet = new QueryClient()
createRoot(document.getElementById("root")!).render(
<GoogleOAuthProvider clientId="572931689498-m0f9tsrn7gephcjmfb9ntp3qj44qq08b.apps.googleusercontent.com">
 <QueryClientProvider client={clinet}>
<App/>
 </QueryClientProvider>
</GoogleOAuthProvider>
);
