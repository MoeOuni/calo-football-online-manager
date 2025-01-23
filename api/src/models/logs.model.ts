import { model, Schema, Document } from 'mongoose';

// Going with the usual principle who, when and what
const LogSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export interface ILog {
  userId: string;
  action: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const LogModel = model<ILog & Document>('logs', LogSchema);
