import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import * as bcrypt from 'bcrypt';
import { UpdateMessageDto } from './dto/update-message.dto';
import { FileService, IFile } from 'src/file/file.service';

type IMessageCreate = {
  message: CreateMessageDto,
  user: any
}
type IMessageUpdate = {
  message: UpdateMessageDto,
  user: any
}

export type ILimit = {
  offset: number,
  limit: number
}

type IFileMessage = {audio: Express.Multer.File[], image: Express.Multer.File[]}

export type IChat = {
  chat: Schema.Types.ObjectId
}

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly fileService: FileService
  ) {}

  async create({ message, user }: IMessageCreate, {audio, image}: IFileMessage): Promise<string> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
      }
      const audios = audio.length ?  await Promise.all(audio.map(aud => this.fileService.createFile(IFile.AUDIO, aud))): null
      const images = image.length ?  await Promise.all(image.map(img => this.fileService.createFile(IFile.PICTURE, img))): null
      const newMessage = await this.messageModel.create({text: message.text, chat: message.chat, audio: audios, image: images, sender: user})
      return newMessage._id
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async update({ message: {messageId, text}, user }: IMessageUpdate, {image, audio}: IFileMessage): Promise<string> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
      }
      if (!messageId) {
        throw new HttpException("Нет сообщения", HttpStatus.UNAUTHORIZED);
      }
      
      const updateMessage = await this.messageModel.findById(messageId)
      if (updateMessage.sender.toString() !== user._id.toString()) {
        throw new HttpException("Вы не можете отредактировать это соообщение", HttpStatus.FORBIDDEN);
      }
      const audios = audio.length ?  await Promise.all(audio.map(aud => this.fileService.createFile(IFile.AUDIO, aud))): null
      const images = image.length ?  await Promise.all(image.map(img => this.fileService.createFile(IFile.PICTURE, img))): null
     
      updateMessage.audio = audios
      updateMessage.image = images
      updateMessage.text = text 
      await updateMessage.save()
      return updateMessage._id
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async delete(id: ObjectId, user: any): Promise<string> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
      }
      const deleteMessage = await this.messageModel.findById(id)
      if (deleteMessage._id.toString() !== user._id.toString()) {
        throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
      }
      await deleteMessage.remove()
      return "success";
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }


}
