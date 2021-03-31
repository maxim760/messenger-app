import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      const candidate = await this.findOne(user.email);
      if (candidate) {
        throw new HttpException('Такая почта уже существует', 400);
      }
      const candidateByEmail = await this.userModel.findOne({
        email: user.email,
      });
      if (candidateByEmail) {
        throw new HttpException('Такой email уже существует', 400);
      }
      const { password2, ...registerData } = user;
      const hashPassword = await bcrypt.hash(user.password, 7);
      const createdUser = await this.userModel.create({
        ...registerData,
        password: hashPassword,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  
  
  async getAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getById(id: ObjectId) {
    try {
      if (!id) {
        throw new HttpException("Не передан id пользователя", 500);
      }
      const user = await this.userModel.findById(id);
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
  async searchUser(query: string): Promise<User[]> {
    try {
      return await this.userModel.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { surname: { $regex: query, $options: 'i' } },
        ],
      });
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}
