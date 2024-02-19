import { JwtUtil } from '../util/jwt.util';

export function wsAuthMiddleware(socket, next) {
    try {
        const { authorization } = socket.handshake.headers;
        JwtUtil.isValidAuthHeader(authorization);
        return next();
    } catch (error) {
        socket.emit("error", error);
        return next(error);
    }
}
