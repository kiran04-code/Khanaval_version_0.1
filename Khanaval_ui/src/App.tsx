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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/mess/:id" element={<MessDetailPage />} />
          <Route path="/epass" element={<EPassPage />} />
          <Route path="/order/:id" element={<OrderTrackingPage />} />
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/mess" element={<UserDashboard />} />
          <Route path="/tiffin" element={<UserDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
