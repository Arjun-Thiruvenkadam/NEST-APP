import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import AppController from './app.controller';
import AppService from './app.service';
import TicketsModule from './ticketsModule/ticket.module';
import AuthModule from './authenticationModule/auth.module';
import UserModule from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketsModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
