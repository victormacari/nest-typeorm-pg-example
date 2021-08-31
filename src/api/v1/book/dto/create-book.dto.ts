import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(60)
  title: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(45)
  iban: string;

}
