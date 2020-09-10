import { Model } from 'mongoose';
import { TicketStatus, Ticket } from './ticket.interface';

export class TicketsModel {
  constructor(private readonly ticketModel: Model<Ticket>) {}

  async getAllTickets(): Promise<Ticket[]> {
    const tickets = await this.ticketModel.find({}, '-_id -__v').exec();
    return tickets;
  }

  createRes = (id: number, flag: boolean): TicketStatus => {
    const updateStatus = {
      ticketId: id,
      updated: flag,
    };
    return updateStatus;
  };

  async updateAllTickets(tickets: Ticket[]): Promise<TicketStatus[]> {
    const result = [];
    for (const ticketIndex in tickets) {
      const ticketObj = tickets[ticketIndex];
      const res = await this.ticketModel.updateOne(
        { ticketId: ticketObj.ticketId, status: 'open' },
        { status: 'closed', personId: ticketObj.personId },
      );
      if (res.nModified == 1)
        result.push(this.createRes(parseInt(ticketObj.ticketId), true));
      else result.push(this.createRes(parseInt(ticketObj.ticketId), false));
    }
    return result;
  }

  async getTicket(id: number): Promise<Ticket> {
    const result = await this.ticketModel.findOne({ ticketId: id }).exec();
    return result;
  }

  async getTicketsWithStatus(stat: string): Promise<Ticket[]> {
    const tickets = await this.ticketModel
      .find({ status: stat }, '-_id -__v')
      .exec();
    return tickets;
  }

  async resetTickets(): Promise<string> {
    const res = await this.ticketModel
      .updateMany({}, { status: 'open', personId: null })
      .exec();
    return res.nModified + ' Modified';
  }

  async updateTicket(id: number, userId: string): Promise<string> {
    const result = await this.ticketModel
      .updateOne(
        { ticketId: id, status: 'open' },
        { personId: userId, status: 'closed' },
      )
      .exec();
    if (result.nModified == 1) return 'Success';
    return 'Already Booked';
  }
}
