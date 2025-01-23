import { usePlayer } from "@/api";
import { EmptyPlayersState } from "@/components/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IPlayerPopulated } from "@/lib/interfaces";
import { formatDistanceToNow } from "date-fns";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Players = () => {
  const players = usePlayer();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {players.isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {players?.data?.length !== 0 && (
            <h2 className="text-2xl font-bold">Players List</h2>
          )}
          {players?.data?.length === 0 ? (
            <EmptyPlayersState />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players?.data?.map(
                  (player: IPlayerPopulated, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {formatDistanceToNow(
                          new Date(player?.updatedAt ?? Date.now()),
                          {
                            addSuffix: true,
                          }
                        )}
                      </TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.role}</TableCell>
                      <TableCell>{player.teamId?.name}</TableCell>
                      <TableCell>
                       -
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default Players;
