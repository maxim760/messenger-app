import { IsNotEmpty } from "class-validator";
import { Schema } from "mongoose";

export class CreateMessageDto {
  text ?: string;
  @IsNotEmpty({message: "Не указан чат"})
  chat: Schema.Types.ObjectId;
  volumes ?: number[]
  duration ?: number
}