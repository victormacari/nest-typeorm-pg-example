import { MaxLength, IsOptional, MinLength, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  @IsOptional()
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(45)
  @IsOptional()
  iban: string;
}
