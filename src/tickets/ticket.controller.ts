import { Controller, Put, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import TicketsService from './ticket.service';
import Ticket from './dto/ticket.dto';
import TicketStatus from './dto/ticketStatus.dto';
import TicketPayload from './dto/ticketPayload.dto';
import AuthGuard from './ticket.gaurd';

@Controller('tickets')
export default class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Put('update')
  @ApiBody({ type: TicketPayload, isArray: true, required: true })
  async updateTickets(
    @Body() tickets: TicketPayload[],
  ): Promise<TicketStatus[]> {
    const result = await this.ticketsService.updateAllTickets(tickets);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('reset')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resetTickets(@Body() key: string): Promise<string> {
    const tickets = await this.ticketsService.resetTickets();
    return tickets;
  }

  @Put(':id')
  @ApiBody({ type: String, required: true })
  async updateTicketStatus(
    @Param('id') ticketId: string,
    @Body('userId') userId: string,
  ): Promise<string> {
    const id = parseInt(ticketId, 10);
    if (Number.isNaN(id)) return 'Check URL';
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
    if (Number.isNaN(id)) return 'Check URL';
    const ticket = await this.ticketsService.getTicket(id);
    return ticket;
  }

  @Get('status/:stat')
  async getTicketsWithStatus(@Param('stat') stat: string): Promise<Ticket[]> {
    const tickets = await this.ticketsService.getTicketsWithStatus(stat);
    return tickets;
  }
}
