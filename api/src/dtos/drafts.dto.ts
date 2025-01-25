import { IsEnum, IsNotEmptyObject, IsObject, IsOptional, IsString } from 'class-validator';

export class SaveDraftDto {
  @IsString()
  //   We can add draft for more section like players or leagues if the app grows bigger for now its just team
  @IsEnum(['team'], {
    message: 'Draft type should be only team',
  })
  public type: string;
  @IsObject({ message: 'MetaJSON should be a valid object' })
  @IsNotEmptyObject()
  public metaJSON: any;

  @IsString()
  @IsOptional()
  public path: string;
}
