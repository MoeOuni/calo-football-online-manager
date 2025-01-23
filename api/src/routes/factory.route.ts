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
    this.router.get(`${this.path}/teams`, AuthMiddleware, this.factory.getTeams);
    this.router.get(`${this.path}/composition`, AuthMiddleware, this.factory.getAvailablePlayersComposition);
  }
}
