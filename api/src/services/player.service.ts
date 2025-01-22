import { HttpException } from '@/exceptions/HttpException';
import { IPlayer } from '@/interfaces/player.interface';
import { PlayerModel } from '@/models/players.model';
import { Service } from 'typedi';

@Service()
export class PlayerService {
  public async createPlayer(player: IPlayer): Promise<IPlayer> {
    const newPlayer = new PlayerModel({ ...player });

    await newPlayer.save();

    return newPlayer.toJSON() as IPlayer;
  }

  public async bulkCreatePlayers(players: IPlayer[]): Promise<IPlayer[]> {
    const newPlayers = await PlayerModel.insertMany(players);

    return newPlayers;
  }

  public async getPlayers(): Promise<IPlayer[]> {
    const players = await PlayerModel.find();

    return players;
  }

  public async getPlayerById(playerId: string): Promise<IPlayer> {
    const player = await PlayerModel.findById(playerId);

    if (!player) throw new HttpException(404, 'Player not found');

    return player;
  }
}
