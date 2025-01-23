import { usePlayer } from "@/api";
import { PlayersDataTable } from "@/components/data-tables/players-data-table";
import { EmptyPlayersState } from "@/components/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

const Players = () => {
  const players = usePlayer();

  return (
    <div className="space-y-4">
      {players.isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {players?.data?.length !== 0 && (
            <h2 className="text-2xl font-bold">Players List</h2>
          )}
          {players?.data?.length === 0 ? (
            <EmptyPlayersState />
          ) : (
            <Card className="shadow-md">
              <CardContent>
                <PlayersDataTable
                  data={players?.data}
                  loading={players?.isLoading}
                />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Players;
