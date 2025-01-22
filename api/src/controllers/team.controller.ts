import { NextFunction, Request, Response } from 'express';
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
      const { teamData, playersData } = req.body;
      const newTeam: ITeam = await this.team.createTeam(teamData);

      const playersBulkPayload = playersData.map((player: IPlayer) => ({ ...player, teamId: newTeam._id }));
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
