/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '@/interfaces/users.interface';
import { APIFeatures } from '@/utils/api-features';
import { PLAYERS_ROLES } from '@/utils/constants';
import { Request } from 'express';

export class FactoryService {
  Model: any;

  constructor(Model: any) {
    this.Model = Model;
  }

  public getAll = async (req: Request) => {
    const features = new APIFeatures(this.Model.find(), req.query).search().filter().sort().limitFields().paginate();

    return await features.query;
  };

  public getAllPopulated = async (req: Request, populateObj: { path: string; select: string }) => {
    const features = new APIFeatures(
      this.Model.find().populate({
        ...populateObj,
      }),
      req.query,
    )
      .search()
      .filter()
      .sort()
      .limitFields()
      .paginate();

    return await features.query;
  };

  public getAvailablePlayers = async (
    user: IUser,
  ): Promise<{
    [key: string]: number;
  }> => {
    // When called in the controller the model that will be passed to the constructor will be the PlayersModel
    const userPlayers = await this.Model.find({ userId: user._id });

    const playersCount = {
      [PLAYERS_ROLES.GOALKEEPER.toLowerCase()]: 0,
      [PLAYERS_ROLES.DEFENDER.toLowerCase()]: 0,
      [PLAYERS_ROLES.MIDFIELDER.toLowerCase()]: 0,
      [PLAYERS_ROLES.ATTACKER.toLowerCase()]: 0,
    };

    // Count existing players roles
    userPlayers.forEach(userPlayer => {
      playersCount[userPlayer.role.toLowerCase()] += 1;
    });

    // Count the rest of the roles from the user's players

    const availablePlayers = Object.keys(playersCount).reduce((acc, role) => {
      acc[role] = user.playersCountRight[role] - playersCount[role];
      return acc;
    }, {});

    return availablePlayers;
  };
}
