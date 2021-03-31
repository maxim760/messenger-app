import {IsEmail, IsNotEmpty, Matches, Min, MinLength} from 'class-validator';
import { Match } from '../decorators/match.decorator';


export class CreateUserDto {

  @IsNotEmpty({
    message: "Имя не должно быть пустым"
  })
  name: string

  @IsNotEmpty({
    message: "Фамилия не должна быть пустой"
  })
  surname: string

  @IsNotEmpty({
    message: "Email не должен быть пустым"
  })
  @IsEmail({}, {
    message: "email некорректный"
  })
  email: string


  @MinLength(4, {
    message: "Минимальная длина пароля - 4 символов"
  })
  password: string

  @Match("password", {
    message: "Пароли не совпадают"
  })
  password2: string
}