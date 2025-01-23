import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryProvider } from "./providers/react-query-provider.tsx";
import { LoaderCircle } from "lucide-react";
import { AuthProvider } from "./providers/authentication-provider.tsx";

import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./providers/user-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="flex min-h-[100vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      </div>
    }
  >
    <ReactQueryProvider>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </ReactQueryProvider>
  </Suspense>
);
