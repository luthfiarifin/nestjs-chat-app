import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(800, {
  namespace: '/chats',
})
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
}
