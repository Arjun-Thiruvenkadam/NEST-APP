import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../src/app.module';

describe('API testing (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Ticket with id (GET)', () =>
    request(app.getHttpServer())
      .get('/tickets/1')
      .then(res => {
        expect(res.body).toHaveProperty('ticketId', 1);
        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('personId');
      }));

  it('Tickets (GET)', () =>
    request(app.getHttpServer())
      .get('/tickets')
      .then(res => {
        expect(res.body).toBeDefined();
      }));
});
