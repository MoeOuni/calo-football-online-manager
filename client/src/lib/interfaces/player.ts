import { PlayerRole } from "../types";

export interface Player {
  _id: string;
  name: string;
  role: PlayerRole;
  userId?: string;
  upToSale?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlayerPopulated extends Player {
  teamId?: {
    _id: string;
    name: string;
  };
}
