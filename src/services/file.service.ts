import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FileCountResultsDto } from "./dto/file-counter-result.dto";
import { DataSourceStrategyService } from "./datasource-stategy.service";
import { IDataSource } from "@/factories/datasource-interface";
import { FileCounterRequestDto } from "./dto/file-request.dto";


@Injectable()
export class FileService {
  constructor(private readonly dataSourceStrategyService: DataSourceStrategyService) {}


  getDataSource(type: string): IDataSource {
    const factory = this.dataSourceStrategyService.getFactory(type);

    return factory.createDataSource();
  }

  async extractCountData(fileRequest: FileCounterRequestDto): Promise<FileCountResultsDto>{
    try{
      const fileSource = this.getDataSource(this.determinateFileSource(fileRequest.FileLocation));

      const fileContent = await fileSource.getFileContent(fileRequest.FileLocation);

      // Process file content
      const resultDto = new FileCountResultsDto()
      
      resultDto.wordCount = this.countWords(fileContent);
      resultDto.lettersCount = this.countLetters(fileContent);
      resultDto.spacesCount = this.countSpaces(fileContent);
      resultDto.wordOccurrencies = this.countWordOccurencies(fileContent);
      
      return resultDto;
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error processing file: ${error.message}`);
      } else {
        throw new InternalServerErrorException('Unknown error occurred while processing file');
      };
    }
  }

  // Number of words in a text file
  countWords = (filePath: string): number => {
    const words = filePath.split(/\s+/).filter(word => word !== ''); // Split by whitespace and filter out empty strings
    return words.length;
  };

  // Number of letters in a text file
  countLetters = (data: string): number => {
    const letters = data.replace(/\s+/g, '').split(''); // Remove whitespace and split into array of characters
    return letters.length;
  };

  // Number of spaces in a text file
  countSpaces = (data: string): number => {
    const spaces = data.match(/\s/g); // Match whitespace characters
    return spaces ? spaces.length : 0;
  };

  // List of words that are repeated more than 10 times, with count
  countWordOccurencies = (text: string): { word: string, occurrencies: number }[] => {
    const wordCounts: { [word: string]: number } = {};

    const sanitizedText = text.replace(/[^\w\s]/g, '').toLowerCase();
    const words = sanitizedText.split(/\s+/);
    
    words.forEach(word => {
      if (wordCounts[word]) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    });
    
    // Filter words that occur more than 10 times
    const result: { word: string, occurrencies: number }[] = [];
    for (const word in wordCounts) {
      if (wordCounts[word] > 10) {
        result.push({ word, occurrencies: wordCounts[word] });
      }
    }
    
    return result;
  }

  determinateFileSource = (location: string): 'url' | 'file' => {

      // local file paths (Unix-like and Windows)
     
      const localPathPattern =
      /^(\/|\.\.?\/|[a-zA-Z]:\\|\\\\[a-zA-Z0-9._-]+\\[a-zA-Z0-9._-]+\\)?(\w|\/|\\)*([a-zA-Z0-9\s_@\-^!#$%&+={}\[\]]+)?(\.\w{2,})?$/

  
      // URLs (HTTP and HTTPS)
      const urlPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
  
      if (localPathPattern.test(location)) {
          return 'file';
      } else if (urlPattern.test(location)) {
          return 'url';
      } else {
          throw new Error('Input is not a proper URL or file path');
      }
  }
  
}

