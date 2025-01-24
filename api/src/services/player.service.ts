import { HttpException } from '@/exceptions/HttpException';
import { IPlayer } from '@/interfaces/player.interface';
import { IUser } from '@/interfaces/users.interface';
import { PlayerModel } from '@/models/players.model';
import { TeamModel } from '@/models/teams.model';
import { UserModel } from '@/models/users.model';
import { PLAYERS_ROLES } from '@/utils/constants';
import { Service } from 'typedi';
import { LogService } from './log.service';
import { MailService } from './mail.service';

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

    if (player.upToSale) throw new HttpException(400, 'Player is already listed for sale');

    if (player.userId.toString() !== user._id.toString()) {
      throw new HttpException(403, 'You are not authorized to list this player for sale');
    }

    // Get the length of the players of the team and that are not upToSale.
    const teamCount = await PlayerModel.find({ teamId: player.teamId, upToSale: false }).countDocuments();

    // Check if the team has exactly 15 players that are not upToSale.
    if (teamCount - 1 < 15) {
      throw new HttpException(400, `You can't list a player for sale if your team has exactly 15 players`);
    }

    player.upToSale = true;
    player.saleValue = price;

    await player.save();

    // Save Log
    await new LogService().createLog(user?._id, `Listed player ${player.name} for sale for ${price}`);

    // Send Email
    await new MailService(user, {
      playerName: player.name,
      price: price,
    }).sendPlayerListedToSale();

    return player.toJSON() as IPlayer;
  }

  public async removePlayerFromMarket(playerId: string, user: IUser): Promise<IPlayer> {
    const player = await PlayerModel.findById(playerId);

    if (!player) throw new HttpException(404, 'Player not found');

    if (!player.upToSale) throw new HttpException(400, 'Player is not listed for sale');

    if (player.userId.toString() !== user._id.toString()) {
      throw new HttpException(403, 'You are not authorized to remove this player from sale');
    }

    player.upToSale = false;
    player.saleValue = 0;

    await player.save();

    // Save Log
    await new LogService().createLog(user?._id, `Removed player ${player.name} from sale`);

    // Send Email
    await new MailService(user, {
      playerName: player.name,
    }).sendPlayerRemovedFromSale();

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

    const buyerUserTeam = await TeamModel.findOne({ userId: user?._id });

    if (!buyerUserTeam) throw new HttpException(400, "You can't purchase players when you don't have a team");

    // Check if a user has more 25 players in his team
    const teamCount = await PlayerModel.find({ teamId: buyerUserTeam._id }).countDocuments();

    if (teamCount === 25) throw new HttpException(400, "You can't purchase anymore players your team already contains the maximum number");

    const buyerUser = await UserModel.findById(user._id);
    const sellerUser = await UserModel.findById(player.userId);

    // Just in case even when its a one in a million chance to happen
    if (!buyerUser || !sellerUser) throw new HttpException(404, 'User not found');

    // Check Balance
    if (buyerUser.balance < player.saleValue) throw new HttpException(400, 'You do not have enough balance to purchase this player');

    // Update buyer balance and playersCountRight
    buyerUser.balance -= player.saleValue;
    buyerUser.playersCountRight[player.role.toLowerCase()] += 1;

    // Update seller balance (95% of the original price) and playersCountRight
    sellerUser.balance += player.saleValue * 0.95;
    sellerUser.playersCountRight[player.role.toLowerCase()] -= 1;

    // Save Changes
    await buyerUser.save();
    await sellerUser.save();

    // Save Logs
    await new LogService().createLog(user?._id, `Purchased player ${player.name} for ${player.saleValue}`);
    await new LogService().createLog(sellerUser?._id, `Sold player ${player.name} for ${player.saleValue}`);

    // Send Emails
    await new MailService(sellerUser, {
      playerName: player.name,
      price: player.saleValue * 0.95,
    }).sendPurchasePlayerSeller();

    await new MailService(buyerUser, {
      playerName: player.name,
      price: player.saleValue,
    });

    // Update player
    player.userId = buyerUser._id;
    player.upToSale = false;
    player.saleValue = 0;
    player.teamId = buyerUserTeam._id;
    await player.save();

    return player.toJSON() as IPlayer;
  }
}
