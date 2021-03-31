require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { FriendsModule } from './friends/friends.module';
import { FileModule } from './file/file.module';
import { UserStatusModule } from './userStatus/userStatus.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.rdudk.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
    ),
    AuthModule,
    ChatModule,
    FileModule,
    FriendsModule,
    MessageModule,
    UserModule,
    UserStatusModule
  ],
})
export class AppModule {}
