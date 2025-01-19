import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <ProtectedRoutes />
      <PublicRoutes />
    </Router>
  );
}

export default App;
