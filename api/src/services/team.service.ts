import { HttpException } from '@/exceptions/HttpException';
import { ITeam } from '@/interfaces/team.interface';
import { TeamModel } from '@/models/teams.model';
import { Service } from 'typedi';
import { Types } from 'mongoose';

@Service()
export class TeamService {
  public async createTeam(team: ITeam): Promise<ITeam> {
    const newTeam = new TeamModel({ ...team });

    await newTeam.save();

    return newTeam;
  }

  public async getTeam(id: string): Promise<ITeam> {
    const team = await TeamModel.findById(id);

    if (!team) throw new HttpException(404, 'Team not found');

    return team;
  }

  public async getMeTeam(userId: string) {
    const teams = await TeamModel.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: 'teamId',
          as: 'players',
        },
      },
      {
        $addFields: {
          composition: {
            goalkeeper: {
              $size: {
                $filter: {
                  input: '$players',
                  as: 'player',
                  cond: { $eq: ['$$player.role', 'goalkeeper'] },
                },
              },
            },
            defender: {
              $size: {
                $filter: {
                  input: '$players',
                  as: 'player',
                  cond: { $eq: ['$$player.role', 'defender'] },
                },
              },
            },
            midfielder: {
              $size: {
                $filter: {
                  input: '$players',
                  as: 'player',
                  cond: { $eq: ['$$player.role', 'midfielder'] },
                },
              },
            },
            attacker: {
              $size: {
                $filter: {
                  input: '$players',
                  as: 'player',
                  cond: { $eq: ['$$player.role', 'attacker'] },
                },
              },
            },
          },
        },
      },
      {
        $project: {
          players: 0, // Exclude the players array from the final output
        },
      },
    ]);

    return teams;
  }

  public async updateTeam(teamId: string, team: ITeam): Promise<ITeam> {
    const updatedTeam = await TeamModel.findOneAndUpdate({ _id: teamId }, team, { new: true });
    return updatedTeam;
  }

  public async checkTeamOwnership(teamId: string, userId: string): Promise<boolean> {
    const team = await TeamModel.findOne({ _id: teamId, userId: userId });

    if (!team) return false;

    return true;
  }

  public async getTeamPopulatedById(teamId: string): Promise<{
    team: {
      _id: string;
      name: string;
      userId: string;
    };
    players: {
      _id: string;
      name: string;
      role: string;
      teamId: string;
    }[];
  }> {
    const team = await TeamModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(teamId),
        },
      },
      {
        $lookup: {
          from: 'players',
          localField: '_id',
          foreignField: 'teamId',
          as: 'players',
        },
      },
      {
        $project: {
          name: 1,
          userId: 1,
          players: 1,
        },
      },
    ]);

    return team[0];
  }
}
