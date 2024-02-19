import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) { }

  async create(senderId: string, createChatDto: CreateChatDto) {
    const createdChat = new this.chatModel({
      ...createChatDto,
      sender_id: senderId,
    });
    return createdChat.save();
  }
}
