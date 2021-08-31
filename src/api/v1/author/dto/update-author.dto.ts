import { IsNotEmpty, MaxLength, MinLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuthorDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(15)
  last_name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

}
