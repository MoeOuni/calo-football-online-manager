import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, UserCircle, BarChart3, User, CircleGauge } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/providers/authentication-provider";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { name: "Dashboard", to: "/", icon: CircleGauge },
  { name: "Team", to: "/team", icon: Users },
  { name: "Players", to: "/players", icon: User },
  { name: "Market", to: "/market", icon: BarChart3 },
];

export function Navbar() {
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  return (
    <nav className="flex items-center justify-between w-full px-3 lg:px-6 space-x-4 lg:space-x-6">
      <Sidebar />
      <div className="flex items-center space-x-4 lg:space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary hidden md:flex",
              location.pathname === item.to
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4 inline-block mr-2" />
            {item.name}
          </Link>
        ))}
      </div>
      <div className="ml-auto space-x-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"} className="h-8 w-8 rounded-full">
              <UserCircle className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Manager</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Balance:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(user?.balance ?? 0)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
