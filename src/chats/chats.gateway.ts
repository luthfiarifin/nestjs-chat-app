import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from 'src/config/guard/ws-jwt-auth.guard';
import { wsAuthMiddleware } from 'src/config/middleware/ws-auth.middleware';

@WebSocketGateway(800, {
  namespace: '/chats',
})
@UseGuards(WsJwtAuthGuard)
export class ChatsGateway {

  constructor(private readonly chatsService: ChatsService) { }

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('create')
  async create(
    @ConnectedSocket() client,
    @MessageBody() createChatDto: CreateChatDto
  ) {
    const senderId = client.handshake.user._id.toString();
    const chat = await this.chatsService.create(senderId, createChatDto);

    this.server.emit('new-chat', chat);
  }

  afterInit(client: Socket) {
    client.use((socket, next) => wsAuthMiddleware(socket, next));
  }
}
