import {
  Controller,
  Put,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { Ticket } from './interfaces/ticket.interface';
import { TicketStatus } from './interfaces/ticketStatus.interface';
import AuthGuard from './ticket.gaurd';

@Controller('tickets')
export default class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Put('update')
  async updateTickets(@Body() tickets: Ticket[]): Promise<TicketStatus[]> {
    const result = await this.ticketsService.updateAllTickets(tickets);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('reset')
  async resetTickets(): Promise<string> {
    const tickets = await this.ticketsService.resetTickets();
    return tickets;
  }

  @Put(':id')
  async updateTicketStatus(
    @Param('id') ticketId: string,
    @Query('userId') userId: string,
  ): Promise<string> {
    const id = parseInt(ticketId, 10);
    if (isNaN(id)) return 'Check URL';
    const res = await this.ticketsService.updateTicket(id, userId);
    return res;
  }

  @Get('')
  async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketsService.getAllTickets();
    return tickets;
  }

  @Get(':id')
  async getTicket(@Param('id') ticketId: string): Promise<Ticket | string> {
    const id = parseInt(ticketId, 10);
    if (isNaN(id)) return 'Check URL';
    const ticket = await this.ticketsService.getTicket(id);
    return ticket;
  }

  @Get('status/:stat')
  async getTicketsWithStatus(@Param('stat') stat: string): Promise<Ticket[]> {
    const tickets = await this.ticketsService.getTicketsWithStatus(stat);
    return tickets;
  }
}
