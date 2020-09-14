import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import UserSchema from '../users/user.schema';
import { UserModule } from '../users/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
