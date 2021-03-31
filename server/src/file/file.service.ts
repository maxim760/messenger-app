import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { MulterModule } from '@nestjs/platform-express';
import { nanoid } from 'nanoid';

export type MulterFile = Express.Multer.File

export enum IFile {
  AUDIO = 'audio',
  PICTURE = 'picture',
}

@Injectable()
export class FileService {
  createFile(type: IFile, file: Express.Multer.File): string {
    try {
      const fileExt = file.originalname.split('.').pop();
      const fileName = nanoid() + '.' + fileExt;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(
        path.resolve(filePath, fileName),
        file.buffer
      );
      return `${type}/${fileName}`
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileName)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        return "success"
      }
      throw new HttpException("Файл не найден", 400)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}