import {
  HttpCode,
  HttpException,
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId, Types } from 'mongoose';
import { nanoid } from 'nanoid';
import { UserSchema, User, UserDocument } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  
  /*

  {
        friends: 1,
        status: 0,
        sendRequests: 0,
        incomingRequests: 0,
        avatar: 0,
        name: 0,
        surname: 0,
        email: 0,
        _id: 0,
        chates: 0
      }

  */
  
  async getAll(id: string) {
    try {
      if (!isValidObjectId(id)) {
        throw new BadRequestException("Некорректный id")
      }
      const users = await this.userModel.findById(id).select("friends").populate("friends");
      return users

    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getTotalFriends({id, userId}: {id?:string, userId: string}) {
    try {
      const idForFind = isValidObjectId(id) ? id : userId
  
      const users = await this.userModel
        .findById(idForFind)
        .populate({path: "friends", select: "-password"})
        .populate({path: "sendRequests", select: "-password"})
        .populate({path: "incomingRequests", select: "-password"})
        .select("friends incomingRequests sendRequests")
        return users
    } catch (error) {
      
      throw new HttpException(error.message, 500);
    }
  }
  async addFriend(id: string, user: any) {
    try {
      if (!user) {
        throw new UnauthorizedException("Не авторизован")
      }
      const thisUser = await this.userModel.findById(user._id)
      // without populate
      const requests = thisUser.incomingRequests
      const candidateIdx = requests.findIndex(req => req.toString() === id)
      if (candidateIdx === -1) {
        throw new HttpException("Заявка в друзья не найдена", HttpStatus.BAD_REQUEST)
      }
      thisUser.friends.push(id as unknown as User)
      thisUser.incomingRequests.splice(candidateIdx, 1)
      await thisUser.save();
      const newFriend = await this.userModel.findById(id)
      const sendIdx = newFriend.sendRequests.findIndex(req => req.toString() === user._id)
      if (sendIdx === -1) {
        throw new BadRequestException("Пользователь не найден")
      }
      newFriend.friends.push(user._id)
      newFriend.sendRequests.splice(sendIdx, 1)
      await newFriend.save()
      return "success"

      
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
async deleteFriend(id: string, user: any) {
  try {
    if (!user) {
      throw new UnauthorizedException("Не авторизован")
    }
    
    const thisUser = await this.userModel.findById(user._id)
    const deletedFriend = await this.userModel.findById(id)
    const deletedUserIdx = deletedFriend.friends.findIndex(fr => fr.toString() === user._id)
    const deleteIdx = thisUser.friends.findIndex(fr => fr.toString() === id)
    if (deleteIdx === -1 || deletedUserIdx === -1) {
      throw new BadRequestException("Друг для удаления не найден")
    }
    thisUser.incomingRequests.push(thisUser.friends[deleteIdx])
    thisUser.friends.splice(deleteIdx, 1)
    deletedFriend.sendRequests.push(user._id)
    deletedFriend.friends.splice(deletedUserIdx, 1)
    await thisUser.save()
    await deletedFriend.save()
    return "success"
  } catch (error) {
    throw new HttpException(error.message, 500)
  }
}
async getAllSend(id: string) {
  try {
    return await this.userModel.findById(id).select("sendRequests").populate({path: "sendRequests", select: "-password"});
  } catch (error) {
    throw new HttpException(error.message, 500)
  }
}
async addSendRequest(id: string, user: any) {
  try {
    if (!user) {
      throw new UnauthorizedException("Не авторизован")
    }
    const thisUser = await this.userModel.findById(user._id)
    const findUser = await this.userModel.findById(id)
    if (!findUser) {
      throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST)
    }
    thisUser.sendRequests.push(findUser._id)
    await thisUser.save()
    findUser.incomingRequests.push(thisUser._id)
    await findUser.save()
    return "success"
    
  } catch (error) {
    throw new HttpException(error.message, 500)
  }
}
async deleteSendRequest(id: string, mode: string, user: any) {
  try {
    if (!user) {
      throw new UnauthorizedException("Не авторизован")
    }
    const thisUser = await this.userModel.findById(user._id)
    if (mode === "all") {
      const reqs = thisUser.sendRequests
      const users = await this.userModel.find({ "_id": { $in: reqs } })
      users.forEach(async (delUser) => {
        const idxDel = delUser.incomingRequests.findIndex(req => req.toString() === user._id)
        if (idxDel !== -1) {
          delUser.incomingRequests.splice(idxDel, 1);
          await delUser.save();
        }
      })
      thisUser.sendRequests = [];
      await thisUser.save()
      return "success"
    }

    const idx = thisUser.sendRequests.findIndex(req => req.toString() === id)
    const delUser = await this.userModel.findById(id)
    const idxDel = delUser.incomingRequests.findIndex(req => req.toString() === user._id)
    if (idx === -1 || idxDel === -1) {
      throw new BadRequestException("Пользователь не найден")
    }
    thisUser.sendRequests.splice(idx, 1);
    delUser.incomingRequests.splice(idxDel, 1); 
    await thisUser.save()
    await delUser.save()
    return "success"
    
  } catch (error) {
    throw new HttpException(error.message, 500)
  }
}
async getIncomingRequest(id: string) {
  try {
    return await this.userModel.findById(id).select("incomingRequests").populate({path: "incomingRequests", select: "-password"});
  } catch (error) {
    throw new HttpException(error.message, 500)
  }
}
}
