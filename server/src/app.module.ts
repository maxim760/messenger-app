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
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppGateway } from './app.gateway';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.rdudk.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&readPreference=secondary&ssl=true`,
    ),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
    ChatModule,
    FileModule,
    FriendsModule,
    MessageModule,
    UserModule,
    UserStatusModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
