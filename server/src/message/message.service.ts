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
import { Chat, ChatDocument } from 'src/chat/schemas/chat.schema';
import { withoutExt } from 'src/utils/withoutExt';

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

type IFileMessage = {audio: Express.Multer.File[],voice ?: Express.Multer.File[], image: Express.Multer.File[]}

export type IChat = {
  chat: Schema.Types.ObjectId
}



@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private readonly fileService: FileService,
  ) {}
  
  async create({ message, user }: IMessageCreate, {audio, image, voice: voiceFromMsg}: IFileMessage): Promise<Message> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
      }
      const chatId = message.chat
      const voiceInfo = message.volumes ? { volumes:JSON.parse(message.volumes as unknown as string), duration: +message.duration }: null
      const audios = audio.length
        ? await Promise.all(audio.map((aud) => ({
          url: this.fileService.createFile(IFile.AUDIO, aud),
          name: withoutExt(aud.originalname)
        })))
        : null
      const images = image.length ?  await Promise.all(image.map(img => this.fileService.createFile(IFile.PICTURE, img))): null
      const voices = voiceFromMsg.length ?  await Promise.all(voiceFromMsg.map(v => this.fileService.createFile(IFile.VOICE, v))): null
      const newMessage = await this.messageModel.create({ text: message.text, chat: message.chat, audio: audios, image: images, sender: user, voice: voices?.[0] ? { url: voices[0], ...voiceInfo } : null })
      await newMessage.save()
      const chat =await this.chatModel.findById(chatId)
      chat.messages.push(newMessage)
      await chat.save()

      return await newMessage.populate([{path: "chat", model: "Chat", populate: {path: "users", model: "User"}},{path: "sender", model: "User"}]).execPopulate()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async update({ message: {messageId, text, volumes}, user }: IMessageUpdate, {image, audio, voice: voiceFromMsg}: IFileMessage): Promise<Message> {
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
      const audios = audio.length
        ? await Promise.all(audio.map(aud => ({url: this.fileService.createFile(IFile.AUDIO, aud), name: withoutExt(aud.originalname)})))
        : null
      
      
      const images = image.length ? await Promise.all(image.map(img => this.fileService.createFile(IFile.PICTURE, img))) : null
      const [voice] = voiceFromMsg.length ?  await Promise.all(voiceFromMsg.map(v => this.fileService.createFile(IFile.VOICE, v))): null
      updateMessage.audio = audios
      updateMessage.image = images
      updateMessage.voice = {url:voice, volumes: JSON.parse(volumes as any) as number[]}
      updateMessage.text = text 
      await updateMessage.save()
      return updateMessage
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


  async getAll({ limit, offset, id }: ILimit & { id: string }, user:any): Promise<Message[]> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
      }
      offset = offset ?? 0
      limit = limit ?? 15
      //@ts-ignore
      const messages = await this.messageModel
        .find({chat: id})
        .skip(offset)
        .limit(limit)
        .sort({createdAt: "desc"})
        .populate([{
          path: "sender",
          model: "User",
          select: "-password"
        },{
          path: "chat",
          model: "Chat",
        }])
      return messages.reverse()
    } catch (error) {
      throw new HttpException(error.message, 500)    
    }
  
  }


}
