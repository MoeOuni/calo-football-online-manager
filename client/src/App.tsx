import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { useAuth } from "./providers/authentication-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { UserProvider } from "./providers/user-provider";

function App() {
  const { isAuthorized } = useAuth();

  return (
    <Router>
      <UserProvider>
      <Toaster />
      <SonnarToaster position="top-right" />
      <TooltipProvider>
        {isAuthorized ? <ProtectedRoutes /> : <PublicRoutes />}
      </TooltipProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
