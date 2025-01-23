import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyTeamsState } from "@/components/empty-state";
import { useMeTeams } from "@/api";
import { LoaderCircle, Pencil, PlusCircle, ReceiptText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ITeam } from "@/lib/interfaces/team";
import { IPlayerComposition } from "@/lib/interfaces";

interface TeamItem extends ITeam {
  composition: IPlayerComposition;
}

export default function TeamsList() {
  const teams = useMeTeams();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {teams.isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {teams?.data?.length !== 0 && (
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Team List</h2>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/teams/save")}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline">Create New Team</span>
              </Button>
            </div>
          )}
          {teams?.data?.length === 0 ? (
            <EmptyTeamsState />
          ) : (
            <>
              {teams?.data?.map((team: TeamItem, index: number) => (
                <Card key={index} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{team.name}</span>
                      {team.status === "draft" && (
                        <Badge variant="secondary" className="ml-2">
                          Draft
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Last update:{" "}
                      {team?.updatedAt &&
                        formatDistanceToNow(new Date(team.updatedAt), {
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
                        {Object.entries(team.composition).map(
                          ([position, count]) => (
                            <TableRow key={position}>
                              <TableCell className="capitalize">
                                {position}
                              </TableCell>
                              <TableCell>{count as number} Player(s)</TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <ReceiptText className="h-4 w-4" />
                        Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() =>
                          navigate(
                            team.status === "draft"
                              ? `/teams/save?draft=${team._id}`
                              : `/teams/save/${team._id}`
                          )
                        }
                      >
                        <Pencil className="h-4 w-4" />
                        {team.status === "draft" ? "Continue" : "Update"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
