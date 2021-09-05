import {
  IsOptional,
  IsString,
  IsDate,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuthorDto {
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  @IsOptional()
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(15)
  @IsOptional()
  lastName: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  birthday: Date;
}
