import { DraftController } from '@/controllers/draft.controller';
import { SaveDraftDto } from '@/dtos/drafts.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class DraftRoute implements Routes {
  public path = '/draft';
  public router = Router();
  public draft = new DraftController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(AuthMiddleware);
    this.router.post(`${this.path}/`, ValidationMiddleware(SaveDraftDto), this.draft.saveDraft);
    this.router.get(`${this.path}/:type`, this.draft.getDraft);
  }
}
