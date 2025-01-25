import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { PlayerDataDto } from './players.dto';
import { Type } from 'class-transformer';

export class TeamDataDto {
  @IsString()
  @MinLength(3, { message: 'Team name should be at least 3 characters' })
  public name: string;

  @IsString()
  @IsOptional()
  public image: string;
}

export class SaveTeamDto {
  @IsNotEmpty({ message: 'Team should not be empty' })
  @ValidateNested() // Ensure nested validation is applied
  @Type(() => TeamDataDto) // Transform to TeamDataDto
  public team: TeamDataDto;

  @IsArray({ message: 'Players should be an array' })
  @ArrayMinSize(15, { message: 'There should be at least 15 players' })
  @ArrayMaxSize(25, { message: 'There should be no more than 25 players' })
  @ValidateNested({ each: true }) // Validate each player in the array
  @Type(() => PlayerDataDto) // Transform each player to PlayerDataDto
  public players: PlayerDataDto[];
}
