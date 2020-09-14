import * as mongoose from 'mongoose';
import { TicketSchema } from '../../src/tickets/ticket.schema';
import { ConfigModule } from '@nestjs/config';

describe('insert', () => {
  let connection;
  let ticketsModel;
  beforeAll(async () => {
    ConfigModule.forRoot();
    connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    ticketsModel = mongoose.model('Ticket', TicketSchema);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should get all tickets', async () => {
    const tickets = await ticketsModel.find({});
    expect(tickets).toBeDefined();
  });

  it('should get ticket with id', async () => {
    const ticket = await ticketsModel.findOne({ ticketId: 1 });
    expect(ticket).toHaveProperty('ticketId', 1);
  });

  it('should be null for ticket id <0 and >40', async () => {
    const ticket = await ticketsModel.findOne({ ticketId: 0 });
    expect(ticket).toBeNull();
  });
});
