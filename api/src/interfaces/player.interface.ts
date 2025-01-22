export type PlayerRole = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker';

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
