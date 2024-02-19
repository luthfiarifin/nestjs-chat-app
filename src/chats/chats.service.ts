import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schemas/chat.schemas';
import { Model } from 'mongoose';
import { GetChatDto } from './dto/get-chat.dto';

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

  async findAll(roomId: string, getChatDto: GetChatDto) {
    const query = {
      room_id: roomId,
    };

    if (getChatDto.last_id) {
      query['_id'] = { $lt: getChatDto.last_id };
    }

    return this.chatModel.find(query).sort({ createdAt: -1 }).limit(getChatDto.limit);
  }
}
