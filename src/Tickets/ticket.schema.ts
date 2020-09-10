import * as mongoose from 'mongoose';

export const TicketSchema = new mongoose.Schema({
  ticketId: Number,
  status: String,
  personId: String,
});

