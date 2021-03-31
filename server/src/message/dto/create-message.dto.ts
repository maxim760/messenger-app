import { IsNotEmpty } from "class-validator";
import { Schema } from "mongoose";

export class CreateMessageDto {
  @IsNotEmpty({message: "Текст обязателен"})
  text: string;
  @IsNotEmpty({message: "Не указан чат"})
  chat: Schema.Types.ObjectId;
}