import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { useAuth } from "./providers/authentication-provider";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const { isAuthorized } = useAuth();

  return (
    <Router>
      <Toaster />
      <SonnarToaster position="top-right" />
      <TooltipProvider>
        {isAuthorized ? <ProtectedRoutes /> : <PublicRoutes />}
      </TooltipProvider>
    </Router>
  );
}

export default App;
