import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PlayerDataDto {
  @IsString()
  @IsNotEmpty({ message: 'Player name should not be empty' })
  public name: string;

  @IsString()
  @IsNotEmpty({ message: 'Player role should not be empty' })
  @IsEnum(['goalkeeper', 'defender', 'midfielder', 'attacker'], {
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

export class SellPlayerDto {
  @IsString()
  @IsNotEmpty({ message: 'Player ID should not be empty' })
  public playerId: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Price should not be empty' })
  @Min(1, { message: 'Price should be at least 1' })
  public price: number;
}
