import { model, Schema, Document } from 'mongoose';
import { ITeam } from '@/interfaces/team.interface';

const TeamSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ['complete', 'incomplete'],
      default: 'incomplete',
    },
  },
  {
    timestamps: true,
  },
);

export const TeamModel = model<ITeam & Document>('teams', TeamSchema);
