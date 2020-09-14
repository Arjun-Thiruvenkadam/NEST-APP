import { Model } from 'mongoose';
import UserService from '../users/user.service';
import { Ticket } from './interfaces/ticket.interface';
import { TicketPayload } from './interfaces/ticketPayload.interface';
import { TicketStatus } from './interfaces/ticketStatus.interface';

export default class TicketsModel {
  constructor(
    private readonly ticketModel: Model<Ticket>,
    private readonly userService: UserService,
  ) {}

  async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketModel.find({}, '-_id -__v').exec();
    return tickets;
  }

  // helper
  createTicket(id: number, flag: boolean): TicketStatus {
    const ticket = {
      ticketId: id,
      updated: flag,
    };
    return ticket;
  }

  // helper
  async validatePersonId(personId: string): Promise<boolean> {
    const user = await this.userService.getUserWithId(personId);
    if (user === 'Invalid Id') return false;
    if (user === 'No User Available with the given id') return false;
    return true;
  }

  async updateAllTickets(tickets: TicketPayload[]): Promise<TicketStatus[]> {
    const ticketsResult = [];
    for (const ticketIndex in tickets) {
      const ticket = tickets[ticketIndex];
      if (await this.validatePersonId(ticket.personId)) {
        const result = await this.ticketModel.updateOne(
          { ticketId: ticket.ticketId, status: 'open' },
          { status: 'closed', personId: ticket.personId },
        );
        if (result.nModified == 1) {
          ticketsResult.push(
            this.createTicket(ticket.ticketId, true),
          );
        } else {
          ticketsResult.push(
            this.createTicket(ticket.ticketId, false),
          );
        }
      } else {
        ticketsResult.push(this.createTicket(ticket.ticketId, false));
      }
    }
    return ticketsResult;
  }

  async getTicket(id: number): Promise<Ticket> {
    const result = await this.ticketModel
      .findOne({ ticketId: id }, '-_id -__v')
      .exec();
    return result;
  }

  async getTicketsWithStatus(stat: string): Promise<Ticket[]> {
    const tickets = await this.ticketModel
      .find({ status: stat }, '-_id -__v')
      .exec();
    return tickets;
  }

  async resetTickets(): Promise<string> {
    const result = await this.ticketModel
      .updateMany({}, { status: 'open', personId: null })
      .exec();
    return `${result.nModified} Modified`;
  }

  async updateTicket(id: number, userId: string): Promise<string> {
    if (await this.validatePersonId(userId)) {
      const result = await this.ticketModel
        .updateOne(
          { ticketId: id, status: 'open' },
          { personId: userId, status: 'closed' },
        )
        .exec();
      if (result.nModified === 1) return 'Success';
      return 'Already Booked';
    }
    return 'Check User Id';
  }
}
