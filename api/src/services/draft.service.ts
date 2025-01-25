import { IDraft } from '@/interfaces/draft.interface';
import { IUser } from '@/interfaces/users.interface';
import { DraftModel } from '@/models/drafts.model';
import { Service } from 'typedi';
import { LogService } from './log.service';

@Service()
export class DraftService {
  public async saveDraft(draftData: IDraft, user: IUser): Promise<IDraft> {
    const existingDraft = await DraftModel.findOne({ idUser: user._id, type: draftData.type });

    if (existingDraft) {
      existingDraft.metaJSON = draftData.metaJSON;
      existingDraft.path = draftData.path;
      await existingDraft.save();

      await new LogService().createLog(user._id, 'Updated team creation draft');
      return existingDraft.toJSON() as IDraft;
    }

    const newDraft = new DraftModel({
      ...draftData,
      idUser: user._id,
    });

    await newDraft.save();

    // Save Log
    await new LogService().createLog(user._id, 'Saved team creation draft');

    return newDraft.toJSON() as IDraft;
  }

  public async getDraft(type: string, user: IUser): Promise<IDraft | undefined | null> {
    const draft = await DraftModel.findOne({ idUser: user._id, type: type });
    return draft ? (draft.toJSON() as IDraft) : null;
  }

  public async deleteDraft(type: string, user: IUser): Promise<void> {
    await DraftModel.findOneAndDelete({ idUser: user._id, type: type });
  }
}
