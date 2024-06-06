import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileCountResultsDto {

  @ApiProperty()
  @IsNotEmpty()
  wordCount: number;

  @ApiProperty()
  @IsNotEmpty()
  spacesCount: number;
  
  @ApiProperty()
  @IsNotEmpty()
  lettersCount: number;
  
  @ApiProperty()
  @IsNotEmpty()
  wordOccurrencies: { word: string; occurrencies: number }[]
}