import { Controller, Put, Get, Body, Param, UseGuards } from '@nestjs/common';
import { TicketsService } from './ticket.service';
import { Ticket } from './interfaces/ticket.interface';
import { TicketStatus } from './interfaces/ticketStatus.interface';
import { TicketPayload } from './interfaces/ticketPayload.interface';
import AuthGuard from './ticket.gaurd';
import { ApiBody } from '@nestjs/swagger';

@Controller('tickets')
export default class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Put('update')
  @ApiBody({type:TicketPayload, isArray:true ,required:true})
  async updateTickets(@Body() tickets: TicketPayload[]): Promise<TicketStatus[]> {
    const result = await this.ticketsService.updateAllTickets(tickets);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('reset')
  @ApiBody({type:String , required:true})
  async resetTickets(@Body('key') key: number): Promise<string> {
    const tickets = await this.ticketsService.resetTickets();
    return tickets;
  }

  @Put(':id')
  @ApiBody({type:String,required:true})
  async updateTicketStatus(
    @Param('id') ticketId: string,
    @Body('userId') userId: string,
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
