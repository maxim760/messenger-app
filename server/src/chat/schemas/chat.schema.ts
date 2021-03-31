import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Message } from 'src/message/schemas/message.schema';
import { User } from 'src/user/schemas/user.schema';

export type ChatDocument = Chat & Document;


@Schema({timestamps: true})
export class Chat {
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }] })
  users: User[];
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Message' }], default: [] })
  messages: Message[];
  @Prop()
  name: string

}

const ChatSchema = SchemaFactory.createForClass(Chat);


export {ChatSchema}
