import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TicketsModel from './ticket.model';
import Ticket from './interfaces/ticket.interface';
import TicketStatus from './interfaces/ticketStatus.interface';
import UserService from '../users/user.service';
import TicketPayload from './interfaces/ticketPayload.interface';

@Injectable()
export default class TicketsService {
  private readonly ticketModel;

  constructor(
    @InjectModel('Ticket') private readonly ticModel: Model<Ticket>,
    private readonly userService: UserService,
  ) {
    this.ticketModel = new TicketsModel(ticModel, userService);
  }

  async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketModel.getAllTickets();
    return tickets;
  }

  async updateAllTickets(tickets: TicketPayload[]): Promise<TicketStatus[]> {
    const result = await this.ticketModel.updateAllTickets(tickets);
    return result;
  }

  async getTicket(id: number): Promise<Ticket | string> {
    if (id < 1 || id > 40) return 'There is no ticket with the given id';
    const ticket = await this.ticketModel.getTicket(id);
    return ticket;
  }

  async getTicketsWithStatus(stat: string): Promise<Ticket[]> {
    const tickets = await this.ticketModel.getTicketsWithStatus(stat);
    return tickets;
  }

  async resetTickets(): Promise<string> {
    const result = await this.ticketModel.resetTickets();
    return result;
  }

  async updateTicket(id: number, userId: string): Promise<string> {
    if (id < 1 || id > 40) return 'There is no ticket with the given id';
    const result = await this.ticketModel.updateTicket(id, userId);
    return result;
  }
}
