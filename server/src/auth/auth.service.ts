import * as bcrypt from "bcrypt"
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response} from "express"
// This should be a real class/interface representing a user entity

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  
  // getCookieWithJwtToken(id: any) {
  //   const payload = { id };
  //   const token = this.jwtService.sign(payload);
  //   return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  // }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new HttpException("Пользователя с такой почтой не существует", 400);
    }
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException("Неправильный логин или пароль", 400);
  }

  async login(user: any, response: Response) {
    if (!user) {

      throw new HttpException("Не авторизован", 400)
    }
    const { name, surname, _id, email } = user._doc;
    const payload = { name, surname, email, _id };
    response.cookie("Authentication", this.jwtService.sign(payload), {httpOnly: true})
    return "success"
  }
  async getProfile(user: any) {
    if (!user) {
      throw new HttpException("Не авторизован", 400)
    }
    return user;
  }

}
