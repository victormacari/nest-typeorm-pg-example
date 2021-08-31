import { IsOptional, MaxLength, MinLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuthorDto {
  @MinLength(2)
  @MaxLength(15)
  @IsOptional()
  first_name: string;

  @MinLength(2)
  @MaxLength(15)
  @IsOptional()
  last_name: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthday: Date;

}
