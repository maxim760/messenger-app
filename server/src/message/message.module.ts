import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { FileService} from "../file/file.service"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService, FileService],
})
export class MessageModule {}
