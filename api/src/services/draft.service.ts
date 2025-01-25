import { IDraft } from '@/interfaces/draft.interface';
import { IUser } from '@/interfaces/users.interface';
import { DraftModel } from '@/models/drafts.model';
import { Service } from 'typedi';

@Service()
export class DraftService {
  public async saveDraft(draftData: IDraft, user: IUser): Promise<IDraft> {
    const existingDraft = await DraftModel.findOne({ idUser: user._id, type: draftData.type });

    if (existingDraft) {
      existingDraft.metaJSON = draftData.metaJSON;
      await existingDraft.save();
      return existingDraft.toJSON() as IDraft;
    }

    const newDraft = new DraftModel({
      ...draftData,
      idUser: user._id,
    });

    await newDraft.save();

    return newDraft.toJSON() as IDraft;
  }

  public async getDraft(type: string, user: IUser): Promise<IDraft> {
    const draft = await DraftModel.findOne({ idUser: user._id, type: type });

    if (!draft) {
      throw new Error('Draft not found');
    }

    return draft.toJSON() as IDraft;
  }

  public async deleteDraft(type: string, user: IUser): Promise<void> {
    await DraftModel.findOneAndDelete({ idUser: user._id, type: type });
  }
}
