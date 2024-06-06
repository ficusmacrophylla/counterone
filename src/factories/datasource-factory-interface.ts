import { IDataSource } from "./datasource-interface";

export interface IDataSourceFactory {
  createDataSource(): IDataSource;
}