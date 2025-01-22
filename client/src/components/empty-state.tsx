import { Button } from "@/components/ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyPlayersState() {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center ">
      <div className="w-20 h-20 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">No players added yet</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Start building your roster by adding your first player. Players are the
        heart of your team!
      </p>
      <Button onClick={() => Navigate("/teams/save")}>
        <UserPlus className="mr-2 h-4 w-4" />
        Create New Team
      </Button>
    </div>
  );
}

export function EmptyTeamsState() {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center ">
      <div className="w-20 h-20 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2">No teams created yet</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Get started by creating your first team.
      </p>
      <Button onClick={() => Navigate("/teams/save")}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Team
      </Button>
    </div>
  );
}
