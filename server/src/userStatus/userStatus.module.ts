import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../user/schemas/user.schema';
import { UserStatusController } from './userStatus.controller';
import { UserStatusService } from './userStatus.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserStatusController],
  providers: [UserStatusService],
})
export class UserStatusModule {}
