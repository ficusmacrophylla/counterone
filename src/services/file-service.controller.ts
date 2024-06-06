import { Body, Controller, Get, Post } from '@nestjs/common';
import { FileService } from './file.service';
import { FileCountResultsDto } from './dto/file-counter-result.dto';
import { FileCounterRequestDto } from './dto/file-request.dto';

@Controller()
export class ServicesController {
  constructor(private readonly fileService: FileService) {}

  @Post('process')
  async processFile(@Body() locationInfo: FileCounterRequestDto): Promise<FileCountResultsDto> {
    return this.fileService.extractCountData(locationInfo);
  }
}
