import { Controller, Put, Get, Body, Param, UseGuards, Query } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { Ticket, TicketStatus } from './ticket.interface';
import { AuthGuard } from './ticket.gaurd';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Put('update')
  async updateTickets(@Body() ticketsArr: Ticket[]): Promise<TicketStatus[]> {
    const result = await this.ticketsService.updateAllTickets(ticketsArr);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('reset')
  async resetTickets():Promise<string> {
    const tickets = await this.ticketsService.resetTickets();
    return tickets;
  }

  @Put(':id')
  async updateTicketStatus(
    @Param('id') ticketId: string,
    @Query('userId') userId: string,
  ): Promise<string> {
    const id = parseInt(ticketId);
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
  async getTicketStatus(@Param('id') ticketId: string):Promise<Ticket | string> {
    const id = parseInt(ticketId);
    if (isNaN(id)) return 'Check URL';
    const status = await this.ticketsService.getTicket(id);
    return status;
  }

  @Get('status/:stat')
  async getTicketsWithStatus(@Param('stat')stat:string):Promise<Ticket[]> {
    const closed = await this.ticketsService.getTicketsWithStatus(stat);
    return closed;
  }

}
