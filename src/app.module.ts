import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { InterestsModule } from './interests/interests.module';
import { CommandModule } from 'nestjs-command';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { ChatsModule } from './chats/chats.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI,
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      },
    ),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    CommandModule,
    UsersModule,
    InterestsModule,
    AuthModule,
    RoomsModule,
    ChatsModule,
  ],
})
export class AppModule { }
