import { Router } from 'express';
import { PlayerController } from '@/controllers/player.controller';
import { SellPlayerDto } from '@/dtos/players.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';

export class PlayerRoute implements Routes {
  public path = '/players';
  public router = Router();
  public player = new PlayerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(AuthMiddleware);
    this.router.post(`${this.path}/sell`, ValidationMiddleware(SellPlayerDto), this.player.listPlayerToSell);
    this.router.put(`${this.path}/sell/remove/:playerId`, this.player.removePlayerFromMarket);
    this.router.post(`${this.path}/purchase/:playerId`, this.player.purchasePlayerFromMarket);
  }
}
