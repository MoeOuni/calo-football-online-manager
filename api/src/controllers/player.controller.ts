import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { PlayerService } from '@/services/player.service';

export class PlayerController {
  public player = Container.get(PlayerService);

  public listPlayerToSell = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { playerId, price } = req.body;

      const player = await this.player.listPlayerToSell(playerId, price, req.user);

      res.status(201).json({
        data: player,
        status: 'success',
        message: `${player.name} has been set to sale 🎉`,
      });
    } catch (error) {
      next(error);
    }
  };

  public removePlayerFromMarket = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { playerId } = req.params;

      if (!playerId) {
        throw new Error('Player ID is required');
      }

      const player = await this.player.removePlayerFromMarket(playerId, req.user);

      res.status(201).json({
        data: player,
        status: 'success',
        message: `${player.name} has been removed from market 🎉`,
      });
    } catch (error) {
      next(error);
    }
  };

  public purchasePlayerFromMarket = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { playerId } = req.params;

      if (!playerId) {
        throw new Error('Player ID is required');
      }

      const player = await this.player.purchasePlayerFromMarket(playerId, req.user);

      res.status(201).json({
        data: player,
        status: 'success',
        message: `${player.name} has been purchased 🎉`,
      });
    } catch (error) {
      next(error);
    }
  };
}
