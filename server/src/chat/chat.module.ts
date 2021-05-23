import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { FileService } from 'src/file/file.service';
import { MessageService } from 'src/message/message.service';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';
import { Message, MessageSchema } from 'src/message/schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UserModule,
    MessageModule
    
  ],
  controllers: [ChatController],
  providers: [ChatService, FileService, MessageService],
})
export class ChatModule {}
