import { Injectable } from "@nestjs/common";
import { IDataSourceFactory } from "./datasource-factory-interface";
import { IDataSource } from "./datasource-interface";
import { FileDataSource } from "./file-datasource";

@Injectable()
export class DataSourceFileFactory implements IDataSourceFactory {
  createDataSource(): IDataSource {
    return new FileDataSource();
  }

}