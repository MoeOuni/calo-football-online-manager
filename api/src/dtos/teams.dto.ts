import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { PlayerDataDto } from './players.dto';

export class CreateTeamDto {
  @IsNotEmptyObject()
  public teamData: TeamDataDto;

  @IsArray()
  @ArrayMinSize(15)
  @ArrayMaxSize(25)
  public players: PlayerDataDto[];
}

export class TeamDataDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public image: string;
}
