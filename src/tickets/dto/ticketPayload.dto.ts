import { ApiProperty } from '@nestjs/swagger';

export default class TicketPayload {
  @ApiProperty({ example: 1 })
  ticketId: number;

  @ApiProperty({ example: '5f465cf7a8ecff62f072353e' })
  personId: string;
}
