import {
  Module
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './Tickets/ticket.module';
import { AuthModule } from './Authentication/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TicketsModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','bus-app', 'build')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
