import { Module } from '@nestjs/common';
import { TicketsController } from './ticket.controller';
import { TicketsService } from './ticket.service';
import { AuthModule } from '../Authentication/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }]),
    AuthModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
