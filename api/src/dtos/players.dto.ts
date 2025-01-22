import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerDataDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'])
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
