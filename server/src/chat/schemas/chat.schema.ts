import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { Message, MessageDocument } from 'src/message/schemas/message.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { WithTimeStamp } from 'src/utils/types';

export type ChatDocument = Chat & {_id: string} & Document & {createdAt: any};


@Schema({timestamps: {createdAt: true, updatedAt: true}})
export class Chat {
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User', }], })
  users: UserDocument[];
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Message' }], default: [] })
  messages: WithTimeStamp<Message>[];
  @Prop()
  name ?: string
  @Prop()
  avatar ?: string

}

const ChatSchema = SchemaFactory.createForClass(Chat);


export {ChatSchema}
