import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import TicketSchema from '../../src/tickets/ticket.schema';
import UserSchema from '../../src/users/user.schema';

jest.setTimeout(60000);

describe('Integration Test', () => {
  let ticketsModel;
  let usersModel;
  const personId = '5f465cf7a8ecff62f072353e';
  const sampleUser = {
    userName: 'Arjun',
    mail: 'testuser@gmail.com',
    password: 'Arjun@123',
  };

  beforeAll(async () => {
    ConfigModule.forRoot();
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    ticketsModel = mongoose.model('Ticket', TicketSchema);
    usersModel = mongoose.model('User', UserSchema);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Tickets Model', () => {
    it('should get all tickets', async () => {
      const tickets = await ticketsModel.find({});
      expect(tickets).toBeDefined();
    });

    it('should get ticket with id', async () => {
      const ticket = await ticketsModel.findOne({ ticketId: 1 });
      expect(ticket).toHaveProperty('ticketId', 1);
    });

    it('should be null for ticket id <0 and >40', async () => {
      const ticket = await ticketsModel.findOne({ ticketId: 45 });
      expect(ticket).toBeNull();
    });

    it('should update ticket based on id and status', async () => {
      const ticketId = 1;
      await ticketsModel.updateOne(
        { ticketId, status: 'open' },
        { status: 'closed', personId },
      );
      const ticket = await ticketsModel.findOne({ ticketId });
      expect(ticket.status).toBe('closed');
    });

    it('should not update ticket for invalid id', async () => {
      const ticketId = 56;
      const result = await ticketsModel.updateOne(
        { ticketId, status: 'open' },
        { status: 'closed', personId },
      );
      expect(result.n).toBe(0);
    });

    it('should update match all tickets', async () => {
      const result = await ticketsModel.updateMany(
        {},
        { status: 'open', personId: null },
      );
      expect(result.n).toBe(40);
    });
  });

  describe('User Model', () => {
    it('should get a user', async () => {
      const user = await usersModel.findOne({
        mail: 'arjunthiru123@gmail.com',
      });
      expect(user).toHaveProperty('mail', 'arjunthiru123@gmail.com');
    });

    it('should get a null', async () => {
      const user = await usersModel.findOne({ mail: '__nomail__@gmail.com' });
      expect(user).toBeNull();
    });

    it('should get a user', async () => {
      const user = await usersModel.findById(personId, '-__v -password');
      expect(user).toBeTruthy();
    });

    it('should create and delete a user', async () => {
      const newUser = await usersModel.create(sampleUser);
      expect(newUser).toBeTruthy();

      const result = await usersModel.deleteOne(sampleUser);
      expect(result.n).toBe(1);
    });
  });
});
