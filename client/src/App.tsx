import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Toaster } from "@/components/ui/sonner";
import { isAuthorizationCookieSet } from "./lib/utils";

function App() {
  const isAuthorized = isAuthorizationCookieSet();

  return (
    <Router>
      <Toaster position="top-right" />
      {isAuthorized ? <ProtectedRoutes /> : <PublicRoutes />}
    </Router>
  );
}

export default App;
