import Footer from "@/components/footer";
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
        <main className="md:container md:mx-auto flex-1 mx-2 my-4 lg:my-10 md:my-6 ">
          <Outlet />
        </main>
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="w-full flex h-14 items-center">
            <Footer />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
