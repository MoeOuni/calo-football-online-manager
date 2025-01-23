export type PlayerRole = 'goalkeeper' | 'defender' | 'midfielder' | 'attacker';

export interface IPlayer {
  _id?: string;
  name: string;
  image?: string;
  role: PlayerRole;
  teamId?: string;
  userId?: string;
  upToSale?: boolean;
  saleValue?: number;
}
