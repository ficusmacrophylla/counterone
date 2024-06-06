import { beforeEach, describe } from "node:test";
import { FileService } from "../../src/services/file.service";
import { Test, TestingModule } from "@nestjs/testing";
import { expect, jest, test } from '@jest/globals';
import { DataSourceStrategyService } from "./datasource-stategy.service";
import { DataSourceFileFactory } from "../factories/datasource-file-factory.interface";
import { DataSourceUrlFactory } from "../factories/datasource-url-factory";

describe('FileService', () => {
  let service : FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [FileService, DataSourceStrategyService, DataSourceFileFactory,
        DataSourceUrlFactory,],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('Is service defined?', () => {
    expect(service).toBeDefined();
  })

  // Testing file immission 
  it('should return url for valid URL', () => {
    const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text'
    expect(service.determinateFileSource(url)).toBe('url')
  })

  it('should return file for valid local path', () => {
    const url = 'C:/Users/matte/Desktop/new2.txt'
    expect(service.determinateFileSource(url)).toBe('file')
  })

  it('check for bad URL', () => {
    const url = 'htp://baconipsum/api?type=meat-and-filler&paras=1&format=text'
    expect(service.determinateFileSource(url)).toThrowError()
  })

  it('check for bad file extension', () => {
    const path = `\\Users\\matte\\Desktop\\new2.doc`
    expect(service.determinateFileSource(path)).toThrowError(new Error('Input is not a proper URL or file path'));
  })

  //testing file calculation algorithms
  it('word count check, should return 6', () => {
    const fileContent = 'Quousque tandem abutere, Catilina, patientia nostra?'
    expect(service.countOccurrences(fileContent)).toBe(6);
  })

  test('letters count check, should return 47', () => {
    const fileContent = 'Quousque tandem abutere, Catilina, patientia nostra?'
    expect(service.countLetters(fileContent)).toBe(47);
  })

  test('spaces count check, should return 5', () => {
    const fileContent = 'Quousque tandem abutere, Catilina, patientia nostra?'
    expect(service.countSpaces(fileContent)).toBe(5);
  })

});