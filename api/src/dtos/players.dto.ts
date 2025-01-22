import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerDataDto {
  @IsString()
  @IsNotEmpty({ message: 'Player name should not be empty' })
  public name: string;

  @IsString()
  @IsNotEmpty({ message: 'Player role should not be empty' })
  @IsEnum(['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'], {
    message: "Player role should be 'Goalkeeper', 'Defender', 'Midfielder', or 'Attacker'",
  })
  public role: string;

  @IsString()
  @IsOptional()
  public image: string;

  @IsString()
  @IsOptional()
  public teamId: string;

  @IsBoolean()
  @IsOptional()
  public upToSale: boolean;

  @IsNumber()
  @IsOptional()
  public saleValue: number;
}
