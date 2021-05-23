import { IsNotEmpty } from "class-validator";
import { Schema } from "mongoose";

export class CreateChatDto {
  name?: string;
  users: string[];
}