import { InjectModel } from '@nestjs/mongoose';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Model, ObjectId, Schema, Types } from 'mongoose';


import { ChatDocument, Chat } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-Chat.dto';
import { Message } from 'src/message/schemas/message.schema';
import { User } from 'src/user/schemas/user.schema';


export type ILimit = {
  offset?: number,
  limit?: number
}

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) { }
  async create(createChatDto: CreateChatDto, user: any): Promise<Chat> {
    try {
      const users = JSON.parse(createChatDto.users as unknown as string)
      if (!users.some(createUser => createUser === user._id)) {
        console.log(users)
        console.log(user)
        throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
      }
      const newChat = await this.chatModel.create({ ...createChatDto, users: users.map() })
      return newChat
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  async getAll({ limit, offset, id }: ILimit & { id: ObjectId }, user:any): Promise<Chat> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
      }
      offset = offset ?? 0
      limit = limit ?? 15
      const chat = await this.chatModel
        .findById(id)
        .skip(offset)
        .limit(limit)
        .populate({path: "users", model: "User"})
        .populate({
            path: "messages", populate: {
              path: "sender",
              model: "User"
            }
        })
      if (!chat.users.some(u => (u as unknown as {_id: ObjectId})._id.toString() === user._id.toString())) {
        throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
      }
      return chat
    } catch (error) {
      throw new HttpException(error.message, 500)
    
    }
  
  }
}