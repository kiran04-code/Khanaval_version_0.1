import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import UserDashboard from "./pages/UserDashboard";
import MessDetailPage from "./pages/MessDetailPage";
import EPassPage from "./pages/EPassPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import ProviderDashboard from "./pages/ProviderDashboard";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
import KhanavalProfile from "./pages/Profile";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { PublicRoute } from "./components/PublicRoutes";
import {ProtectedRoutes} from "./components/Routes1";
import RegistrationFlow from "./pages/MessResgisation";
import QRScanner from "./pages/provider/QRScanner";
import QRScanPages from "./pages/Qrcodescan";
import MessDetails from "./pages/messDeatils";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<PublicRoute><AuthPage/></PublicRoute>} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile" element={<ProtectedRoutes><KhanavalProfile /></ProtectedRoutes>} />
          <Route path="/mess/:id" element={<MessDetailPage />} />
          <Route path="/epass" element={<EPassPage />} />
          <Route path="/order/:id" element={<OrderTrackingPage />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/mess" element={<UserDashboard />} />
          <Route path="/provider/messsResgiter" element={<RegistrationFlow />} />
          <Route path="/scan-qr" element={<QRScanPages/>} />
          <Route path="/messsDetails/:messId" element={<MessDetails/>} />
          <Route path="/tiffin" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <ReactQueryDevtools/>
  </QueryClientProvider>
);

export default App;
