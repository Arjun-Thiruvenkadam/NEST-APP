import { TicketsModel } from './ticket.model';
import { Ticket, TicketStatus } from './ticket.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TicketsService {
  private readonly ticketModel;

  constructor(@InjectModel('Ticket') private readonly ticModel: Model<Ticket>) {
    this.ticketModel = new TicketsModel(ticModel);
  }

  async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketModel.getAllTickets();
    return tickets;
  }

  async updateAllTickets(tickets: Ticket[]): Promise<TicketStatus[]> {
    const result = await this.ticketModel.updateAllTickets(tickets);
    return result;
  }

  async getTicket(id: number): Promise<Ticket | string>{
    if (id < 1 || id > 40) return 'There is no ticket with the given id';
    const result = await this.ticketModel.getTicket(id);
    return result;
  }

  async getTicketsWithStatus(stat: string): Promise<Ticket[]> {
    const ticketsClosed = await this.ticketModel.getTicketsWithStatus(stat);
    return ticketsClosed;
  }

  async resetTickets(): Promise<string> {
    const res = await this.ticketModel.resetTickets();
    return res;
  }

  async updateTicket(id: number, userId: string): Promise<string> {
    if (id < 1 || id > 40) return 'There is no ticket with the given id';
    const res = await this.ticketModel.updateTicket(id, userId);
    return res;
  }
}
