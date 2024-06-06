import { IDataSourceFactory } from "../factories/datasource-factory-interface";
import { DataSourceFileFactory } from "../factories/datasource-file-factory.interface";
import { DataSourceUrlFactory } from "../factories/datasource-url-factory";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DataSourceStrategyService {
  //private strategies: { [key: string]: IDataSourceFactory };

  constructor(
    private readonly urlFactory: DataSourceUrlFactory,
    private readonly fileFactory: DataSourceFileFactory
  ) {
  }

  getFactory(type: string): IDataSourceFactory {
    if(type === 'url') return this.urlFactory
    if(type === 'file') return this.fileFactory
    else {
      throw new Error(`No factory found for type: ${type}`);
    }
  }
}