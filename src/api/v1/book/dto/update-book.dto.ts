import { MaxLength, IsOptional, MinLength } from 'class-validator';

export class UpdateBookDto {
 
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  title: string;
 
  @IsOptional()
  @MinLength(10)
  @MaxLength(45)
  iban: string;
}
