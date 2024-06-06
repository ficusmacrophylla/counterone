import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ServicesController } from './file-service.controller';
import { DataSourceStrategyService } from './datasource-stategy.service';
import { DataSourceUrlFactory } from '@/factories/datasource-url-factory';
import { DataSourceFileFactory } from '@/factories/datasource-file-factory.interface';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [ServicesController],
  providers: [
    DataSourceFileFactory,
    DataSourceUrlFactory,
    {
    provide: 'URL_DATASOURCE_FACTORY',
    useExisting: DataSourceUrlFactory
  },
  {
    provide: 'FILE_DATASOURCE_FACTORY',
    useExisting: DataSourceFileFactory
  },
  DataSourceStrategyService,
  FileService
  ],
  exports: [FileService],
})
export class FileServiceModule {}
