export type PlayerRole = 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Attacker';

export interface IPlayer {
  name: string;
  image?: string;
  role: PlayerRole;
  upToSale?: boolean;
  saleValue?: number;
}
