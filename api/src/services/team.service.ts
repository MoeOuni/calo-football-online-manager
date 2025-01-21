import { HttpException } from '@/exceptions/HttpException';
import { ITeam } from '@/interfaces/team.interface';
import { TeamModel } from '@/models/teams.model';
import { Service } from 'typedi';

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
}
