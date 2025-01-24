import { IPlayer } from '@/interfaces/player.interface';
import { model, Schema, Document } from 'mongoose';

const PlayerSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['goalkeeper', 'defender', 'midfielder', 'attacker'],
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'teams',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    upToSale: {
      type: Boolean,
      default: false,
    },
    saleValue: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
    query: {
      searchDocument(value: string) {
        return this.where({
          $or: [{ name: { $regex: value, $options: 'i' } }],
        });
      },
    },
  },
);

export const PlayerModel = model<IPlayer & Document>('players', PlayerSchema);
