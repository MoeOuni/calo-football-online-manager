import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { TeamController } from '@/controllers/team.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { CreateTeamDto } from '@/dtos/teams.dto';

export class TeamRoute implements Routes {
  public path = '/teams';
  public router = Router();
  public team = new TeamController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // All routes in this file are protected by the AuthMiddleware (Requires the user to be logged in)
    this.router.use(AuthMiddleware);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTeamDto), this.team.createTeam);
  }
}
