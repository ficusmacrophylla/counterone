import { Injectable, InternalServerErrorException, Next, NotFoundException } from "@nestjs/common";
import { IDataSource } from "./datasource-interface";
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom, map, throwIfEmpty } from "rxjs";

@Injectable()
export class UrlDataSource implements IDataSource {

  constructor(private readonly httpService: HttpService = new HttpService){}

  getFileContent(location: string): Promise<string> {
    return firstValueFrom(this.fileDowload(location))
  }

  fileDowload(url: string): Observable<string> {
    return this.httpService.request<string>({
      method: 'get',
      url,
      responseType: 'arraybuffer',
    }).pipe(
      throwIfEmpty( () => { 
        
        throw new NotFoundException('Unable to retrieve file from given url') 
      }),map( response => { 
        const fileContent = Buffer.from(response.data).toString('utf-8')
        return fileContent
      })); 
  }
}