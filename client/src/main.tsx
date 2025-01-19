import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryProvider } from "./providers/react-query-provider.tsx";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="flex min-h-[100vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      </div>
    }
  >
  <ReactQueryProvider>
    <App />
  </ReactQueryProvider>
  </Suspense>
);
