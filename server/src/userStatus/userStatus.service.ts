import {
  HttpCode,
  HttpException,
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { UserSchema, User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  
  async setStatus({status}: CreateStatusDto, user: any) {
    try {
      if(!user) {
        throw new UnauthorizedException("Не авторизован")
      }
      const thisUser = await this.userModel.findById(user._id)
      thisUser.status = status
      await thisUser.save()
      return status
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
    async updateStatus({status}: UpdateStatusDto, user: any) {
      try {
        if(!user) {
          throw new UnauthorizedException("Не авторизован")
        }
        const thisUser = await this.userModel.findById(user._id)
        thisUser.status = status
        await thisUser.save()
        return status
      } catch (error) {
        throw new InternalServerErrorException(error.message)
      }
    }
    async removeStatus(user: any) {
      try {
        if(!user) {
          throw new UnauthorizedException("Не авторизован")
        }
        const thisUser = await this.userModel.findById(user._id)
        thisUser.status = null
        return "success";
      } catch (error) {
        throw new InternalServerErrorException(error.message)
      }
    }
  
}
