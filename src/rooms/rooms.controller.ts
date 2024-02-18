import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/guard/jwt-auth.guard';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(req.user._id.toString(), createRoomDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getByRequest(@Request() req) {
    return this.roomsService.getByRequest(req.user._id.toString());
  }
}
