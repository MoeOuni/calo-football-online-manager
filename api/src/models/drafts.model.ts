import { IDraft } from '@/interfaces/draft.interface';
import { model, Schema, Document } from 'mongoose';

const DraftSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['market', 'teams', 'players', 'profile'],
    },
    metaJSON: {
      type: Schema.Types.Mixed,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  },
);

export const DraftModel = model<IDraft & Document>('drafts', DraftSchema);
