import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(dto: CreateUserDto) {
    const createdUser = new this.userModel(dto);
    const savedUser = await createdUser.save();

    return {
      message: 'User created successfully',
      data: savedUser,
    };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('interests').exec();

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();

    if (!updatedUser) {
      throw new NotFoundException('Could not find user.');
    }

    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const removedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!removedUser) {
      throw new NotFoundException('Could not find user.');
    }

    return {
      message: 'User deleted successfully',
      data: removedUser,
    };
  }
}
