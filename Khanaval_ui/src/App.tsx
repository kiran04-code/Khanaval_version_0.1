import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import HowItWorks from "./pages/HowitWork";
import HelpSupport from "./pages/HelpSupport";
import FeedbackForm from "./pages/FeedBackFrom";
import MealRedeemPage from "./pages/MealReademPage";
import Paas from "./pages/Paas";
import Announcements from "./pages/Anniumment";
import CloudeKitchen from "./pages/KitchenDashBorad/CloudeKitchen";
import CloudKitchenOnboarding from "./pages/KitchenDashBorad/CloudKitchenOnboarding";

const App = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
          );
          console.log("✅ Service Worker registered:", registration);
        } catch (err) {
          console.error("❌ Service Worker registration failed:", err);
        }
      });
    }
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<PublicRoute><AuthPage/></PublicRoute>} />
          <Route path="/CloudeKitchen" element={<CloudeKitchen />} />
          <Route path="/CloudeKitchen/register-kitchen" element={<ProtectedRoutes><CloudKitchenOnboarding /></ProtectedRoutes>} />
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
          <Route path="/how-it-works" element={<HowItWorks/>} />
          <Route path="/MealRedeem/:scanMessId" element={<MealRedeemPage/>} />
          <Route path="/HelpSupport" element={<HelpSupport/>} />
          <Route path="/tiffin" element={<UserDashboard />} />
          <Route path="/FeedBack" element={<FeedbackForm />} />
          <Route path="/pass/:ids" element={<Paas />} />
          <Route path="/Annousment" element={<Announcements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools/>
    </TooltipProvider>
  );
};

export default App;
