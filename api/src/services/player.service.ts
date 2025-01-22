import { HttpException } from '@/exceptions/HttpException';
import { IPlayer } from '@/interfaces/player.interface';
import { IUser } from '@/interfaces/users.interface';
import { PlayerModel } from '@/models/players.model';
import { TeamModel } from '@/models/teams.model';
import { PLAYERS_ROLES } from '@/utils/constants';
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

  public async bulkCheckPlayersRight(players: IPlayer[], user: IUser): Promise<boolean> {
    const existingPlayers = await PlayerModel.find({
      userId: user._id,
    });

    const playersCount = {
      [PLAYERS_ROLES.GOALKEEPER]: 0,
      [PLAYERS_ROLES.DEFENDER]: 0,
      [PLAYERS_ROLES.MIDFIELDER]: 0,
      [PLAYERS_ROLES.ATTACKER]: 0,
    };

    // Count existing players roles
    existingPlayers.forEach(existingPlayer => {
      playersCount[existingPlayer.role] += 1;
    });

    // Count players roles
    players.forEach(player => {
      playersCount[player.role] += 1;
    });

    // Check if the user has exceeded the limit players for each role
    Object.keys(playersCount).forEach(role => {
      if (playersCount[role] > user.playersCountRight[role]) {
        throw new HttpException(400, `You have exceeded the limit players for '${role}s'`);
      }
    });

    // Return true if the user has not exceeded the limit players for each role
    return true;
  }
}
