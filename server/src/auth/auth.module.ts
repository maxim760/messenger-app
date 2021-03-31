require('dotenv').config()
import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
