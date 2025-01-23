import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import { FactoryService } from '@/services/factory.service';
import { TeamModel } from '@/models/teams.model';
import { PlayerModel } from '@/models/players.model';

export class FactoryController {
  public teamsFactory = new FactoryService(TeamModel);
  public playersFactory = new FactoryService(PlayerModel);

  public getTeams = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const teams = await this.teamsFactory.getAll(req);

      res.status(200).json({ data: teams });
    } catch (error) {
      next(error);
    }
  };

  public getPlayers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.query = { ...req.query, userId: req.user._id };
      const players = await this.playersFactory.getAll(req);

      res.status(200).json({ data: players });
    } catch (error) {
      next(error);
    }
  };

  public getMarketPlayers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.query = { ...req.query, upToSale: 'true' };

    const players = await this.playersFactory.getAll(req);

    res.status(200).json({ data: players });
  };

  public getAvailablePlayersComposition = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const availablePlayers = await this.playersFactory.getAvailablePlayers(user);

      res.status(200).json({ data: availablePlayers });
    } catch (error) {
      next(error);
    }
  };
}
