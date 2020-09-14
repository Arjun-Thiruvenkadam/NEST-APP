import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export default class AuthGuard implements CanActivate {
  private request;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.request = context.switchToHttp().getRequest();
    if (this.request.body.key === process.env.ADMIN_KEY) return true;
    return false;
  }
}
