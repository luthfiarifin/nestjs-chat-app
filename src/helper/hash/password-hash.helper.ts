import * as bcrypt from 'bcrypt';
import { StringHelper } from '../string/string.helper';

export class PasswordHashHelper {

    static async hash(password: string): Promise<{ hash: string, passKey: string }> {
        const passKey = StringHelper.generateRandomString(10);
        const hash = await bcrypt.hash(password + passKey, 10);

        return {
            passKey: passKey,
            hash: hash,
        }
    }

    static comparePassword(password: string, passKey: string, hash: string) {
        return bcrypt.compare(password + passKey, hash);
    }
}
