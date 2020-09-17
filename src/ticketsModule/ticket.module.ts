import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import TicketsController from './ticket.controller';
import TicketsService from './ticket.service';
import TicketSchema from './ticket.schema';
import UserModule from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
    UserModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export default class TicketsModule {}
