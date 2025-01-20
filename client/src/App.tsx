import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "./providers/authentication-provider";

function App() {
  const {  isAuthorized } = useAuth();

  return (
    <Router>
      <Toaster position="top-right" />
      {isAuthorized ? <ProtectedRoutes /> : <PublicRoutes />}
    </Router>
  );
}

export default App;
