import { IsString, MaxLength, MinLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  lastName: string;

  @IsDate()
  @Type(() => Date)
  birthday: Date;
}
