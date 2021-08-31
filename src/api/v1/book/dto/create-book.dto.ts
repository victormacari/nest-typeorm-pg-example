import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto { 
 @IsString()
 @MinLength(1)
 @MaxLength(60)
 title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(45)
  iban: string;
}
