import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileCounterRequestDto {
  
  @ApiProperty()
  @IsNotEmpty()
  FileLocation: string;
  
}