import * as jwt from 'jsonwebtoken';

export class JwtUtil {

    static isValidAuthHeader(authorization: string) {
        const token: string = authorization.split(' ')[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            ignoreExpiration: false,
        });

        return payload;
    }
}