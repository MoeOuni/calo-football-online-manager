import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyTeamsState } from "@/components/empty-state";
import { useMeTeams } from "@/api";
import { LoaderCircle, Pencil, ReceiptText } from "lucide-react";
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
import HistoryButton from "@/components/history-button";


export default function TeamsList() {
  const team = useMeTeams();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {team.isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          {team?.data && (
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                <HistoryButton /> Team List
              </h2>
            </div>
          )}
          {!team?.data ? (
            <EmptyTeamsState />
          ) : (
            <>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{team.data.name}</span>
                    {team.data.status === "draft" && (
                      <Badge variant="secondary" className="ml-2">
                        Draft
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                      onClick={() => navigate(`/team/save/${team.data._id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
