import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as mongooseSchema } from 'mongoose';
import { Chat, ChatDocument } from 'src/chat/schemas/chat.schema';

export type UserDocument = User & Document & {_id: string};


@Schema({timestamps: true})
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  avatar: string;
  @Prop({default: "Нет статуса"})
  status: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }] })
  friends: User[]
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }] })
  sendRequests: User[]
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'User' }] })
  incomingRequests: User[]
  
  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Chat' }] })
  chates: ChatDocument[]

  @Prop()
  password: string;

  @Prop({default: false})
  isOnline: boolean;
  @Prop({default: 0})
  lastOnlineTime: number;


}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  //@ts-ignored
  delete obj.password;
  return obj;
};

export {UserSchema}
