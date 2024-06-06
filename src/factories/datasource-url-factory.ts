import { Injectable } from "@nestjs/common";
import { IDataSourceFactory } from "./datasource-factory-interface";
import { IDataSource } from "./datasource-interface";
import { UrlDataSource } from "./url-datasource";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class DataSourceUrlFactory implements IDataSourceFactory {
  createDataSource(): IDataSource {
    return new UrlDataSource();
  }
}