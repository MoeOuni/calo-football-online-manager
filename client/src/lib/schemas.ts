import * as z from "zod";
import { DEFAULT_PLAYERS } from "@/lib/contants";

const playerSchema = z.object({
    name: z.string().min(1, "Player name is required"),
    role: z.enum(["goalkeeper", "defender", "midfielder", "attacker"], {
        errorMap: () => ({ message: "Role must be one of Goalkeeper, Defender, Midfielder, or Attacker" }),
    }),
});

export const teamFormSchema = z.object({
  team: z.object({
    name: z.string().min(3, "Team name is required and should be at least 3 charaters long"),
  }),
  players: z.array(playerSchema).refine(
    (players) => {
      const isValidComposition = Object.entries(DEFAULT_PLAYERS).every(([role, count]) => {
        const roleCount = players.filter((player) => player.role === role).length;
        return roleCount <= count;
      });

      const totalPlayers = players.length;
      const isValidPlayerCount = totalPlayers >= 15 && totalPlayers <= 25;

      return isValidComposition && isValidPlayerCount;
    },
    {
      message: "Team composition does not match the required player counts or the total number of players is not between 15 and 25",
    }
  ),
});

export type TeamFormValues = z.infer<typeof teamFormSchema>;
