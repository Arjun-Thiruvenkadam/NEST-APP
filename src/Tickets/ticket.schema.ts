import * as mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  ticketId: Number,
  status: String,
  personId: String,
});

export default TicketSchema;
