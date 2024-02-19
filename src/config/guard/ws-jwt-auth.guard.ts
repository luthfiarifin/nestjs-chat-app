import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {

    getRequest(context: ExecutionContext) {
        const ctx = context.switchToWs();
        return ctx.getClient().handshake;
    }
}