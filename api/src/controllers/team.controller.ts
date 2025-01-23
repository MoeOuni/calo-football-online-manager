import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { ITeam } from '@/interfaces/team.interface';
import { IPlayer } from '@/interfaces/player.interface';
import { TeamService } from '@/services/team.service';
import { PlayerService } from '@/services/player.service';
import { LogService } from '@/services/log.service';

export class TeamController {
  public team = Container.get(TeamService);
  public player = Container.get(PlayerService);

  public createTeam = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { team, players } = req.body;
      // Check if the user has the right to create players
      await this.player.bulkCheckPlayersRight(players, req.user);

      // Create a new team with the current user's ID
      const newTeam: ITeam = await this.team.createTeam({ ...team, userId: req.user._id, status: 'complete' });

      // Bulk create players with the new team's ID (I prefer to name them as bulk instead of many just a habit of mine 😄)
      const playersBulkPayload = players.map((player: IPlayer) => ({ ...player, teamId: newTeam._id, userId: req.user._id }));
      const newPlayers: IPlayer[] = await this.player.bulkCreatePlayers(playersBulkPayload);

      // Save Log
      await new LogService().createLog(req.user._id, `Created team ${team.name}`);

      res.status(201).json({
        data: {
          ...newTeam,
          players: newPlayers,
        },
        status: 'success',
        message: `${team.name} was saved successfully! 🎉`,
      });
    } catch (error) {
      next(error);
    }
  };

  public getMeTeams = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const teams = await this.team.getMeTeam(req.user._id);

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
