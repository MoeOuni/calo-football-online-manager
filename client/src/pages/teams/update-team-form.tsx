/* eslint-disable react-hooks/rules-of-hooks */
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
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
import { API_STATUS_CODES, PLAYERS_ROLES } from "@/lib/contants";
import {
  Info,
  Loader2,
  LoaderCircle,
  PlusCircle,
  Save,
  Trash2,
} from "lucide-react";
import { teamFormSchema, type TeamFormValues } from "@/lib/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/user-provider";
import HistoryButton from "@/components/history-button";
import { useTeamPopulated, useUpdateTeam } from "@/api";
import type { Player } from "@/lib/interfaces";

export default function UpdateTeamForm() {
  const { toast } = useToast();
  const { composition } = useUser();
  const teamMutation = useUpdateTeam();
  const myTeamQuery = useTeamPopulated();
  const navigate = useNavigate();

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

  // Watch players field array for the render in the updateComposition/available roles section
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

  useEffect(() => {
    if (myTeamQuery.data) {
      form.reset({
        team: { name: myTeamQuery.data.name },
        players: myTeamQuery.data.players.map((player: Player) => ({
          _id: player._id,
          name: player.name,
          role: player.role,
        })),
      });
    }
  }, [myTeamQuery.data, form]);

  if (myTeamQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!myTeamQuery.data) {
    return null;
  }

  const updateComposition = {
    goalkeeper:
      composition?.goalkeeper +
      myTeamQuery?.data?.players?.filter(
        (player: Player) => player.role === "goalkeeper"
      ).length,
    attacker:
      composition?.attacker +
      myTeamQuery?.data?.players?.filter(
        (player: Player) => player.role === "attacker"
      ).length,
    defender:
      composition?.defender +
      myTeamQuery?.data?.players?.filter(
        (player: Player) => player.role === "defender"
      ).length,
    midfielder:
      composition?.midfielder +
      myTeamQuery?.data?.players?.filter(
        (player: Player) => player.role === "midfielder"
      ).length,
  };

  const getRoleCount = (role: PlayerRole) => roleCounts[role] || 0;

  const onSubmit = async (data: TeamFormValues) => {
    const response = await teamMutation.mutateAsync(data);
    // Handle form submission

    if (response?.status === API_STATUS_CODES.SUCCESS) {
      sonnerToast(response?.message);
      navigate("/team");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    if (errors.players) {
      toast({
        title: "❌ Team Composition Error",
        description: errors.players.message || errors.players.root.message,
      });
    }
  };
  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          <HistoryButton /> Update{" "}
          <span className="text-green-600">{myTeamQuery?.data?.name}</span>
        </h2>
        {teamMutation.isPending && <Loader2 className="h-5 w-5 animate-spin" />}
      </div>
      <Card className="w-full">
        <CardContent className="p-3 md:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="team.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter team name"
                            disabled={teamMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Update your team by keeping 15-25 players at all
                          times, adhering to the available roles.
                          <ul className="my-3 ml-2 md:ml-6 [&>li]:mt-2">
                            <li className="flex items-center space-x-2 cursor-help">
                              <Info className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span>
                                Existing Players in the team can't be removed or
                                update you can only add the rest of your
                                available composition.
                              </span>
                            </li>
                          </ul>
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-muted/50 p-3 rounded-md border">
                  <h3 className="text-lg font-semibold mb-2">
                    Available Roles
                  </h3>
                  {updateComposition &&
                    Object.entries(updateComposition).map(
                      ([role, requiredCount]) => (
                        <div
                          key={role}
                          className="flex justify-between items-center"
                        >
                          <span className="capitalize">{role}s:</span>
                          <span>
                            {getRoleCount(role as PlayerRole)} / {requiredCount}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>

              <Card>
                <CardHeader className="p-3 md:p-6">
                  <CardTitle>Players</CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
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
                                      disabled={
                                        teamMutation.isPending ||
                                        fields[index]._id
                                          ? true
                                          : false
                                      }
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
                                    disabled={
                                      teamMutation.isPending ||
                                      fields[index]._id
                                        ? true
                                        : false
                                    }
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
                                            {role.charAt(0).toUpperCase() +
                                              role.slice(1)}
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
                              disabled={
                                teamMutation.isPending || field._id
                                  ? true
                                  : false
                              }
                            >
                              <Trash2 className="h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-between border-t p-3 md:p-6 flex-wrap">
                  <Button
                    size="sm"
                    type="button"
                    variant="ghost"
                    disabled={teamMutation.isPending}
                    onClick={() => {
                      const availableRole =
                        updateComposition &&
                        (Object.entries(updateComposition).find(
                          ([role, limit]) =>
                            getRoleCount(role as PlayerRole) < limit
                        )?.[0] as PlayerRole | undefined);

                      if (availableRole) {
                        append({
                          name: "",
                          role: availableRole,
                        });
                      } else {
                        sonnerToast.info(
                          "All roles have reached their limits."
                        );
                      }
                    }}
                    className="gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Player
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      disabled={teamMutation.isPending}
                      type="submit"
                      className="gap-1"
                    >
                      {teamMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      <span className="hidden md:inline">Update Team</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
