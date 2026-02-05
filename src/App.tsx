 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import Index from "./pages/Index";
 import CitizenDashboard from "./pages/CitizenDashboard";
 import TrackIssues from "./pages/TrackIssues";
 import AuthorityDashboard from "./pages/AuthorityDashboard";
 import Auth from "./pages/Auth";
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
           <Route path="/citizen" element={<CitizenDashboard />} />
           <Route path="/track" element={<TrackIssues />} />
           <Route path="/authority" element={<AuthorityDashboard />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </TooltipProvider>
   </QueryClientProvider>
 );
 
 export default App;
