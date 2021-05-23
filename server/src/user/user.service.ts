import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { parseDate } from 'src/utils/parseDate';
import { Chat, ChatDocument } from 'src/chat/schemas/chat.schema';
import { FileService, IFile } from 'src/file/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly fileService: FileService,
  ) {}

  async create(user: CreateUserDto,  image: Express.Multer.File ): Promise<User> {
    try {
      const candidate = await this.findOne(user.email);
      if (candidate) {
        throw new HttpException('Такая почта уже существует', 400);
      }
      const { password2, ...registerData } = user;
      const avatar = image ?  this.fileService.createFile(IFile.PICTURE, image): ""
      const hashPassword = await bcrypt.hash(user.password, 7);
      const createdUser = await this.userModel.create({
        ...registerData,
        avatar,
        status: "",
        password: hashPassword,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async checkIsOnlineUser(userId: string) {
    try {

      if (!userId) {
        return false
      }
      const user = await this.userModel.findById(userId)
      // если время захода отличается от текущего времени меньше чем на TIME_ONLINE(10 сек), то пользователь онлайн
      return user.lastOnlineTime  + +process.env.TIME_ONLINE > Date.now()
    } catch (error) {
      return false
    }
  }
  
  async setOnlineStatus(userId: any) {
    try {

      if(!userId) {
        throw new UnauthorizedException("Не авторизован")
      }
      const findUser = await this.userModel.findById(userId)
      findUser.lastOnlineTime = Date.now()
      findUser.isOnline = true
      await findUser.save()
      return "success"
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
  
  async setOfflineStatus(userId: any) {
    try {
      if(!userId) {
        throw new UnauthorizedException("Не авторизован")
      }
      const findUser = await this.userModel.findById(userId)
      findUser.isOnline = false
      findUser.lastOnlineTime = Date.now()
      await findUser.save()
      return "success"
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
  
  async getAll(query: string) {
    try {
      const users =  await this.userModel.find({
        "$expr": {
          "$regexMatch": {
            "input": { "$concat": ["$name", " ", "$surname"] },
            "regex": query,  //Your text search here
            "options": "i"
          }
        }
      })
      return users
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getAllChates(user: any) {
    try {
      if (!user) {
        throw new UnauthorizedException("Не авторизован")
      }
      const thisUser = await this.userModel
        .findById(user._id)
        .populate({
          path: "chates", select: "-password", model: "Chat", 
            populate: [{
              path: 'messages',
              model: 'Message',
              populate: {
                path: "sender",
                model: "User",
                select: "-password"
              }
            },{
              path: 'users',
              model: 'User',
            }]}
      ).exec()
      //@ts-ignore
      const chatesFirstMsg = thisUser.chates.map(({ users, messages, _id, avatar, createdAt }) => {
        // если чат из 2 человек (диалог), то возвращаю только собеседника
        let newUsers = users.length === 2 ? users.filter(usr => usr._id + "" !== user._id + "") : users
        if (newUsers.length === 0) {
          newUsers = [users[0]]
        }
        return {_id, avatar, createdAt,users: newUsers, messages: messages.length ? [messages[messages.length - 1]]: []}
      })
      const dataWithoutUpdate = Object.assign({}, thisUser, {chates: chatesFirstMsg})
      const chates = dataWithoutUpdate.chates.map(chat => ({ ...chat, updatedAt: Math.max(...chat.messages.map(msg => parseDate(msg.createdAt))) })).sort((a,b) => b.updatedAt - a.updatedAt) as unknown as ChatDocument[]
      const data: User = {...dataWithoutUpdate, chates }
      return data.chates
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getById(id: ObjectId) {
    try {
      if (!id) {
        throw new HttpException("Не передан id пользователя", 500);
      }
      const user = await this.userModel.findById(id).populate({path: "friends", select: "-password"}).populate({path: "incomingRequests", select: "-password"}).populate({path: "sendRequests", select: "-password"});
      if (!user) {
        throw new HttpException('Пользователя с таким id не существует', 400);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email });
  }
}
