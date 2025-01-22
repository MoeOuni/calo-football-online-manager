import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { ITeam } from '@/interfaces/team.interface';
import { IPlayer } from '@/interfaces/player.interface';
import { TeamService } from '@/services/team.service';
import { PlayerService } from '@/services/player.service';

export class TeamController {
  public team = Container.get(TeamService);
  public player = Container.get(PlayerService);

  public createTeam = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { team, players } = req.body;
      const newTeam: ITeam = await this.team.createTeam(team);

      const playersBulkPayload = players.map((player: IPlayer) => ({ ...player, teamId: newTeam._id }));
      const newPlayers: IPlayer[] = await this.player.bulkCreatePlayers(playersBulkPayload);

      res.status(201).json({
        data: {
          ...newTeam,
          players: newPlayers,
        },
        message: 'Team successfully created',
      });
    } catch (error) {
      next(error);
    }
  };
}
