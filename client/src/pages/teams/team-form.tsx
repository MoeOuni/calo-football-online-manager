import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PlayerRole } from "@/lib/types";
import { DEFAULT_PLAYERS, PLAYERS_ROLES } from "@/lib/contants";
import { PlusCircle, Trash2 } from "lucide-react";
import { teamFormSchema, type TeamFormValues } from "@/lib/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";

export default function TeamForm() {
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      team: { name: "" },
      players: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "players",
    control: form.control,
  });

  // Watch players field array for the render in the composition/available roles section
  const watchedPlayers = useWatch({
    control: form.control,
    name: "players",
  });

  const roleCounts = useMemo(() => {
    return watchedPlayers.reduce((acc, player) => {
      if (player.role) {
        acc[player.role] = (acc[player.role] || 0) + 1;
      }
      return acc;
    }, {} as Record<PlayerRole, number>);
  }, [watchedPlayers]);

  const getRoleCount = (role: PlayerRole) => roleCounts[role] || 0;

  const onSubmit = (data: TeamFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="team.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter team name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-muted/50 p-3 rounded-md border">
                  <h3 className="text-lg font-semibold mb-2">
                    Team Composition
                  </h3>
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

              <Card>
                <CardHeader>
                  <CardTitle>Players</CardTitle>
                  <CardDescription>
                    Add players to your team. Your team must contain 15-25
                    players following the available Composition.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">
                          №
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell className="hidden md:table-cell">
                            <span>{index + 1}</span>
                          </TableCell>
                          <TableCell className="pl-0 pr-1 md:px-4">
                            <FormField
                              control={form.control}
                              name={`players.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Player name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="pl-0 pr-1 md:px-4">
                            <FormField
                              control={form.control}
                              name={`players.${index}.role`}
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {Object.entries(PLAYERS_ROLES).map(
                                        ([key, role]) => (
                                          <SelectItem key={key} value={role}>
                                            {role}
                                          </SelectItem>
                                        )
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="pl-0 pr-1 md:px-4">
                            <Button
                              variant="destructive"
                              onClick={() => remove(index)}
                              size="sm"
                            >
                              <Trash2 className="h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const availableRole = Object.entries(
                        DEFAULT_PLAYERS
                      ).find(
                        ([role, limit]) =>
                          getRoleCount(role as PlayerRole) < limit
                      )?.[0] as PlayerRole | undefined;

                      if (availableRole) {
                        append({
                          name: "",
                          role: availableRole,
                        });
                      } else {
                        alert("All roles have reached their limits.");
                      }
                    }}
                    className="gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Player
                  </Button>
                </CardFooter>
              </Card>

              <Button type="submit" className="w-full">
                Create Team
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
