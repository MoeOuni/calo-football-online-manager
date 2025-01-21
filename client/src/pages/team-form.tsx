import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayerRole } from "@/lib/types";
import { DEFAULT_PLAYERS } from "@/lib/contants";
import { CircleX } from "lucide-react";

interface Player {
  id: number;
  name: string;
  role: PlayerRole;
}

export default function TeamForm() {
  const [teamName, setTeamName] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerRole, setNewPlayerRole] = useState<PlayerRole>("Goalkeeper");

  const addPlayer = () => {
    if (newPlayerName && newPlayerRole) {
      setPlayers([
        ...players,
        { id: Date.now(), name: newPlayerName, role: newPlayerRole },
      ]);
      setNewPlayerName("");
    }
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const getRoleCount = (role: PlayerRole) =>
    players.filter((player) => player.role === role).length;

  const isTeamComplete = () => {
    return (
      teamName.trim() !== "" &&
      Object.entries(DEFAULT_PLAYERS).every(
        ([role, count]) => getRoleCount(role as PlayerRole) === count
      )
    );
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 mt-3">
                    Add Players
                  </h3>
                  <div className="flex space-x-2">
                    <Input
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder="Player name"
                    />
                    <Select
                      value={newPlayerRole}
                      onValueChange={(value) =>
                        setNewPlayerRole(value as PlayerRole)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(DEFAULT_PLAYERS).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={addPlayer}>Add</Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted-foreground/40 p-3 rounded-md border">
                <h3 className="text-lg font-semibold mb-2">Team Composition</h3>
                {Object.entries(DEFAULT_PLAYERS).map(
                  ([role, requiredCount]) => (
                    <div
                      key={role}
                      className="flex justify-between items-center"
                    >
                      <span>{role}s:</span>
                      <span>
                        {getRoleCount(role as PlayerRole)} / {requiredCount}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Player List</h3>
              {players?.length === 0 ? (
                <p className="text-sm">
                  Start creating your team by adding players
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center py-2 px-3 border rounded-md"
                    >
                      <span>
                        {player.name} - {player.role}
                      </span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removePlayer(player.id)}
                      >
                        <CircleX />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button className="w-full" disabled={!isTeamComplete()}>
              {isTeamComplete() ? "Create Team" : "Complete Your Team"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
