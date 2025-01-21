import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Users, BarChart3, User, Menu, Volleyball } from "lucide-react";

const navItems = [
  { name: "Teams", to: "/teams", icon: Users },
  { name: "Members", to: "/members", icon: User },
  { name: "Market", to: "/market", icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <ScrollArea className="h-full py-4 w-full">
          <Link
            to="/"
            className="flex items-center justify-center py-6 gap-2 font-medium"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Volleyball className="size-6" />
            </div>
            <span>
              <span className="text-green-600 font-bold">Calo</span> Football
              Manager
            </span>
          </Link>
          <div className="flex flex-col gap-4 ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2 mx-3 px-1 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
