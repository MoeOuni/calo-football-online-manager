import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="w-full flex h-14 items-center">
            <Navbar />
          </div>
        </header>
        <main className="flex-1 lg:px-11 md:px-6 px-3 py-4 lg:py-10 md:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
