import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
    ) { }

    async login(dto: LoginAuthDto) {
        return await this.usersService.validateUser(dto.email, dto.password);
    }

    async register(dto: RegisterAuthDto) {
        return await this.usersService.create(dto);
    }
}
