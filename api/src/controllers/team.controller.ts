import e, { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { ITeam } from '@/interfaces/team.interface';
import { IPlayer } from '@/interfaces/player.interface';
import { TeamService } from '@/services/team.service';
import { PlayerService } from '@/services/player.service';
import { LogService } from '@/services/log.service';
import { DraftService } from '@/services/draft.service';
import { HttpException } from '@/exceptions/HttpException';

export class TeamController {
  public team = Container.get(TeamService);
  public player = Container.get(PlayerService);
  public draft = Container.get(DraftService);

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

      // Delete the draft if exists;
      await this.draft.deleteDraft('team', req.user);

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

      res.status(200).json(teams[0]);
    } catch (error) {
      next(error);
    }
  };

  public updateTeam = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { team, players } = req.body;
      const { teamId } = req.params;

      // Check if the user has the right to update the team
      const hasTeamOwnership = await this.team.checkTeamOwnership(teamId, req.user._id);

      if (!hasTeamOwnership) throw new HttpException(403, 'You do not have the ownership of this team to update it');

      // Check if the user has the right to create players
      const { newPlayers } = await this.player.bulkCheckUpdatePlayersRight(players, req.user);

      // Update the team
      const updatedTeam: ITeam = await this.team.updateTeam(teamId, team);

      const playersBulkPayload = newPlayers.map((player: IPlayer) => ({ ...player, teamId: updatedTeam._id, userId: req.user._id }));
      const updatedPlayers: IPlayer[] = await this.player.bulkCreatePlayers(playersBulkPayload);

      // Save Log
      await new LogService().createLog(req.user._id, `Updated team ${team.name}`);

      res.status(201).json({
        data: {
          ...updatedTeam,
          players: updatedPlayers,
        },
        status: 'success',
        message: `${team.name} was updated successfully! 🎉`,
      });
    } catch (error) {
      next(error);
    }
  };
}
