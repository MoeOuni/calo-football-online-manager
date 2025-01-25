import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { DraftService } from '@/services/draft.service';
import { IDraft } from '@/interfaces/draft.interface';
import { Container } from 'typedi';

export class DraftController {
  public draft = Container.get(DraftService);

  public saveDraft = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const draftData: IDraft = req.body;

      const draft = await this.draft.saveDraft(draftData, req.user);

      res.status(201).json({
        data: draft,
        status: 'success',
        message: 'Draft saved successfully! 🎉',
      });
    } catch (error) {
      next(error);
    }
  };

  public getDraft = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      const draft = await this.draft.getDraft(type, req.user);

      res.status(200).json(draft);
    } catch (error) {
      next(error);
    }
  };
}
