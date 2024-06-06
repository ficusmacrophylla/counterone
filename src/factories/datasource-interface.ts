export interface IDataSource {
  getFileContent(location: string): Promise<string>;
}