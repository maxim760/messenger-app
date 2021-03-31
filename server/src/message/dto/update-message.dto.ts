import { Schema } from "mongoose";

export class UpdateMessageDto {
  messageId: Schema.Types.ObjectId
  text?: string;
}