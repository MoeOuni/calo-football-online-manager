import { FactoryController } from '@/controllers/factory.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class FactoryRoute implements Routes {
  public path = '/factory';
  public router = Router();
  public factory = new FactoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(AuthMiddleware);
    this.router.get(`${this.path}/teams`, this.factory.getTeams);
    this.router.get(`${this.path}/players`, this.factory.getPlayers);
    this.router.get(`${this.path}/market-players`, this.factory.getMarketPlayers);
    this.router.get(`${this.path}/composition`, this.factory.getAvailablePlayersComposition);
    this.router.get(`${this.path}/logs`, this.factory.getLogs);
  }
}
