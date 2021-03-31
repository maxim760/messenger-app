import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Chat } from 'src/chat/schemas/chat.schema';
import { User } from 'src/user/schemas/user.schema';

export type MessageDocument = Message & Document;


@Schema({timestamps: true})
export class Message {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User' })
  sender: User;
  @Prop()
  text: string;
  @Prop()
  audio: string[];
  @Prop()
  image: string[];
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Chat' })
  chat: Chat;

}

const MessageSchema = SchemaFactory.createForClass(Message);

export {MessageSchema}
