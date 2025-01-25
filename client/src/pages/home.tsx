import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";
import {
  Shield,
  Users,
  Footprints,
  Target,
  Loader2,
  ReceiptText,
  Pencil,
} from "lucide-react";
import { PlayerRole } from "@/lib/types";
import { useMeTeams } from "@/api";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const positionData: Record<
  PlayerRole,
  { name: string; color: string; icon: React.ElementType }
> = {
  goalkeeper: { name: "Goalkeeper", color: "bg-yellow-500", icon: Shield },
  defender: { name: "Defender", color: "bg-blue-500", icon: Users },
  midfielder: { name: "Midfielder", color: "bg-green-500", icon: Footprints },
  attacker: { name: "Attacker", color: "bg-red-500", icon: Target },
};
export default function Home() {
  const { composition } = useUser();
  const team = useMeTeams();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {composition ? (
        <>
          <div>
            <strong>Available Composition</strong>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.entries(composition) as [PlayerRole, number][]).map?.(
              ([position, count]) => {
                const { name, color, icon: Icon } = positionData[position];
                return (
                  <Card key={position}>
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-2">
                        <div className={`${color} p-2 rounded-full`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex w-full items-center justify-between space-x-3">
                          <span>
                            {name}s: <strong>{count}</strong>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </>
      ) : (
        <Loader2 className="h-4 w-4" />
      )}

      {team?.data && (
        <>
          <div className="flex items-center gap-2">
            <strong>{team.data.name}</strong>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <ReceiptText className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 rounded-full"
              // onClick={() => navigate(`/teams/save/${team.data._id}`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Last update:{" "}
              {team?.data.updatedAt &&
                formatDistanceToNow(new Date(team.data.updatedAt), {
                  addSuffix: true,
                })}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Team composition:
            </p>
            <Table className="mb-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(team.data.composition).map(
                  ([position, count]) => (
                    <TableRow key={position}>
                      <TableCell className="capitalize">{position}</TableCell>
                      <TableCell>{count as number} Player(s)</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <div>
        <strong>Recent Activities</strong>
      </div>
    </div>
  );
}
