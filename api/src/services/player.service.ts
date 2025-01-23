import { HttpException } from '@/exceptions/HttpException';
import { IPlayer } from '@/interfaces/player.interface';
import { IUser } from '@/interfaces/users.interface';
import { PlayerModel } from '@/models/players.model';
import { TeamModel } from '@/models/teams.model';
import { UserModel } from '@/models/users.model';
import { PLAYERS_ROLES } from '@/utils/constants';
import { Service } from 'typedi';
import { LogService } from './log.service';

@Service()
export class PlayerService {
  public async createPlayer(player: IPlayer): Promise<IPlayer> {
    const newPlayer = new PlayerModel({ ...player });

    await newPlayer.save();

    // Save Log
    await new LogService().createLog(player.userId, `Created player ${player.name}`);

    return newPlayer.toJSON() as IPlayer;
  }

  public async bulkCreatePlayers(players: IPlayer[]): Promise<IPlayer[]> {
    const newPlayers = await PlayerModel.insertMany(players);

    return newPlayers;
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
      [PLAYERS_ROLES.GOALKEEPER.toLowerCase()]: 0,
      [PLAYERS_ROLES.DEFENDER.toLowerCase()]: 0,
      [PLAYERS_ROLES.MIDFIELDER.toLowerCase()]: 0,
      [PLAYERS_ROLES.ATTACKER.toLowerCase()]: 0,
    };

    // Count existing players roles
    existingPlayers.forEach(existingPlayer => {
      playersCount[existingPlayer.role.toLowerCase()] += 1;
    });

    // Count players roles
    players.forEach(player => {
      playersCount[player.role.toLowerCase()] += 1;
    });

    // Check if the user has exceeded the limit players for each role
    Object.keys(playersCount).forEach(role => {
      if (playersCount[role.toLowerCase()] > user.playersCountRight[role.toLowerCase()]) {
        throw new HttpException(400, `You have exceeded the players limit for '${role}s'`);
      }
    });

    // Return true if the user has not exceeded the limit players for each role
    return true;
  }

  public async listPlayerToSell(playerId: string, price: number, user: IUser): Promise<IPlayer> {
    const player = await PlayerModel.findById(playerId);

    if (!player) throw new HttpException(404, 'Player not found');

    if (player.userId.toString() !== user._id.toString()) {
      throw new HttpException(403, 'You are not authorized to list this player for sale');
    }

    // Get the length of the players of the team.
    const teamCount = await PlayerModel.find({ teamId: player.teamId }).countDocuments();

    if (teamCount - 1 < 15) {
      throw new HttpException(400, `You can't list a player for sale if your team has exactly 15 players`);
    }

    player.upToSale = true;
    player.saleValue = price;

    await player.save();

    // Save Log
    await new LogService().createLog(user?._id, `Listed player ${player.name} for sale for ${price}`);

    return player.toJSON() as IPlayer;
  }

  public async removePlayerFromMarket(playerId: string, user: IUser): Promise<IPlayer> {
    const player = await PlayerModel.findById(playerId);

    if (!player) throw new HttpException(404, 'Player not found');

    if (player.userId.toString() !== user._id.toString()) {
      throw new HttpException(403, 'You are not authorized to remove this player from sale');
    }

    player.upToSale = false;
    player.saleValue = 0;

    await player.save();

    // Save Log
    await new LogService().createLog(user?._id, `Removed player ${player.name} from sale`);

    return player.toJSON() as IPlayer;
  }

  public async purchasePlayerFromMarket(playerId: string, user: IUser): Promise<IPlayer> {
    const player = await PlayerModel.findById(playerId);

    if (!player) throw new HttpException(404, 'Player not found');

    if (player.userId.toString() === user._id.toString()) {
      throw new HttpException(400, 'You can not purchase your own player');
    }

    if (!player.upToSale) {
      throw new HttpException(400, 'Player is not for sale');
    }

    const buyerUser = await UserModel.findById(user._id);
    const sellerUser = await UserModel.findById(player.userId);

    // Just in case even when its a one in a million chance to happen
    if (!buyerUser || !sellerUser) throw new HttpException(404, 'User not found');

    // Check Balance
    if (buyerUser.balance < player.saleValue) throw new HttpException(400, 'You do not have enough balance to purchase this player');

    // Update buyer balance and playersCountRight
    buyerUser.balance -= player.saleValue;
    buyerUser.playersCountRight[player.role.toLowerCase()] += 1;

    // Update seller balance and playersCountRight
    sellerUser.balance += player.saleValue;
    sellerUser.playersCountRight[player.role.toLowerCase()] -= 1;

    // Update player
    player.userId = buyerUser._id;
    player.upToSale = false;
    player.saleValue = 0;

    await buyerUser.save();
    await sellerUser.save();
    await player.save();

    // Save Logs
    await new LogService().createLog(user?._id, `Purchased player ${player.name} for ${player.saleValue}`);
    await new LogService().createLog(sellerUser?._id, `Sold player ${player.name} for ${player.saleValue}`);

    return player.toJSON() as IPlayer;
  }
}
