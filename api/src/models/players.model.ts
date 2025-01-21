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
      enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'],
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
  },
);

export const PlayerModel = model<IPlayer & Document>('players', PlayerSchema);
