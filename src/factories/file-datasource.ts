import * as fs from 'fs';
import * as path from 'path';
import { IDataSource } from './datasource-interface';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FileDataSource implements IDataSource {

  async getFileContent(location: string): Promise<string> {
    if(!this.isTextFile(location)) { throw new BadRequestException('the file is not a valid text file') }

    const path = require('path')
    const filePath = path.join(__dirname,'../../files', location);
      
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath, 'utf-8');
      return data;
    } else {
      throw new NotFoundException('File does not exist');
    }
  }

  isTextFile = (filePath: string): boolean => {
    const textExtensions = ['.txt', '.text', '.md']; 
    const ext = filePath.substring(filePath.lastIndexOf('.'));
    return textExtensions.includes(ext);
};
}