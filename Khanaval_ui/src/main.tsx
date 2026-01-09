import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {GoogleOAuthProvider} from "@react-oauth/google"
createRoot(document.getElementById("root")!).render(
<GoogleOAuthProvider clientId="572931689498-m0f9tsrn7gephcjmfb9ntp3qj44qq08b.apps.googleusercontent.com">
    <App/>
</GoogleOAuthProvider>
);
