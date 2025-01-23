import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/lib/interfaces";
import { EmptyTeamsState } from "@/components/empty-state";

interface Team {
  id: number;
  name: string;
  players: Player[];
}

export default function TeamsList() {
  const teams: Team[] = [];
  return (
    <div className="space-y-4">
      {teams?.length !== 0 && <h2 className="text-2xl font-bold">Team List</h2>}
      {teams?.length === 0 ? (
        <EmptyTeamsState />
      ) : (
        teams?.map((team) => (
          <Card key={team.id}>
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    Goalkeepers:{" "}
                    {team.players.filter((p) => p.role === "goalkeeper").length}
                  </Badge>
                  <Badge variant="secondary">
                    Defenders:{" "}
                    {team.players.filter((p) => p.role === "defender").length}
                  </Badge>
                  <Badge variant="secondary">
                    Midfielders:{" "}
                    {team.players.filter((p) => p.role === "midfielder").length}
                  </Badge>
                  <Badge variant="secondary">
                    Attackers:{" "}
                    {team.players.filter((p) => p.role === "attacker").length}
                  </Badge>
                </div>
                <details>
                  <summary className="cursor-pointer font-semibold">
                    View Players
                  </summary>
                  <ul className="mt-2 space-y-1">
                    {team.players.map((player) => (
                      <li key={player.id}>
                        {player.name} - {player.role}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
