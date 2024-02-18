import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: LoginAuthDto) {
        const validatedUser = await this.usersService.validateUser(dto.email, dto.password);
        const token = await this.signJwtToken(validatedUser._id.toString());

        return {
            message: 'User logged in successfully',
            data: {
                user: validatedUser,
                token: token,
            },
        };
    }

    async register(dto: RegisterAuthDto) {
        const createdUser = await this.usersService.create(dto);
        const token = await this.signJwtToken(createdUser._id.toString());

        return {
            message: 'User created successfully',
            data: {
                user: createdUser,
                token: token,
            },
        };
    }

    private async signJwtToken(userId: string) {
        return this.jwtService.signAsync({ sub: userId });
    }
}
