import { NestMiddleware, Injectable } from '@nestjs/common';
import {Request, Response} from "express";
import { resolve } from 'path';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.sendFile(resolve(__dirname+'../../../bus-app/build/index.html'));
  }
}