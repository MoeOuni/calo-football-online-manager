import { IDraft } from '@/interfaces/draft.interface';
import { model, Schema, Document } from 'mongoose';

const DraftSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ['market', 'team', 'player', 'profile'],
    },
    metaJSON: {
      type: Schema.Types.Mixed,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    path: {
      type: String,
      default: '/', // default path
    },
  },
  {
    timestamps: true,
  },
);

export const DraftModel = model<IDraft & Document>('drafts', DraftSchema);
