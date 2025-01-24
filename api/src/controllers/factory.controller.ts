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

      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  public getPlayers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.query = { ...req.query, userId: req.user._id };
      const players = await this.playersFactory.getAllPopulated(req, {
        path: 'teamId',
        select: 'name',
      });

      res.status(200).json(players);
    } catch (error) {
      next(error);
    }
  };

  public getMarketPlayers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.query = { ...req.query, upToSale: 'true' };

    const populateMatch = { path: 'teamId', select: 'name' };
    if (req.query['teamId.name']) {
      populateMatch['match'] = { $regex: req.query['teamId.name'], $options: 'i' };
    }

    delete req.query['teamId.name'];

    const players = await this.playersFactory.getAllPopulated(req, { ...populateMatch });

    res.status(200).json(players);
  };

  public getAvailablePlayersComposition = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const availablePlayers = await this.playersFactory.getAvailablePlayers(user);

      res.status(200).json(availablePlayers);
    } catch (error) {
      next(error);
    }
  };
}
