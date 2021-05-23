import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model, ObjectId, Schema, Types } from 'mongoose';


import { ChatDocument, Chat } from './schemas/chat.schema';
import { CreateChatDto } from './dto/create-Chat.dto';
import { Message } from 'src/message/schemas/message.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { MessageService } from 'src/message/message.service';
import { FileService, IFile } from 'src/file/file.service';


export type ILimit = {
  offset?: number,
  limit?: number
}

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly messageService: MessageService,
    private readonly fileService: FileService
  ) { }
  async create(createChatDto: CreateChatDto, user: any, image: Express.Multer.File): Promise<Chat> {
    try {
      if(!user) {
        throw new UnauthorizedException("Не авторизован")
      }
      const users = [...createChatDto.users, user]

      if (createChatDto.users.length === 1) {
        try {
          const chat = await this.getByUser(createChatDto.users[0], user)
          return chat
        } catch {}
      }
      const imagePath = image ? this.fileService.createFile(IFile.PICTURE, image): null
      const newChat = await this.chatModel.create({ ...createChatDto, users, avatar: imagePath })
      const findedUsers = await this.userModel.find({ "_id": { $in: users } })
      findedUsers.forEach(async (us) => {
        us.chates.push(newChat)
        await us.save()
      })
      return newChat
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
  async getAll({ limit, offset, id }: ILimit & { id: string }, user:any): Promise<Chat> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
      }
      offset = isNaN(offset) ? 0 : offset
      limit = isNaN(limit) ? 9999 : limit
      const messages = await this.messageService.getAll({limit, offset, id}, user)
      const chat = await this.chatModel
      .findById(id)
      .populate([{path: "users", model: "User", select: "-password"}, {path: "messages", model : "Message", populate: {path: "sender", select: "-password", model: "User"}}])
      
      if (!chat.users.some(u => (u as unknown as {_id: ObjectId})._id.toString() === user._id.toString())) {
        throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
      }
      const usersWithoutMe = chat.users.filter(us => us._id + "" !== user._id  + "")
      return Object.assign(Object.assign(chat, {users: usersWithoutMe}), messages)
    } catch (error) {
      throw new HttpException(error.message, 500)
    
    }
  
  }
  async getByUser(userId: string, user:any): Promise<Chat> {
    try {
      if (!user) {
        throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED)
      }
      const chat = await this.chatModel
        .findOne({users: {$all: [userId, user._id], $size: 2}})
        .populate({ path: "users", model: "User", select: "-password" })
      if (!chat) {
        throw new BadRequestException("Чат не найден")
      }
      const userFriend = chat.users.find((chatUser: User & {_id: string}) => chatUser._id.toString() !== user._id.toString())
      return Object.assign(chat, {name: userFriend.name}) as ChatDocument
    } catch (error) {
      throw new HttpException(error.message, 500)
    
    }
  
  }
}