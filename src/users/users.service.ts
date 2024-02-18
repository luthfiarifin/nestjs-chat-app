import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { PasswordHashHelper } from 'src/helper/hash/password-hash.helper';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async create(dto: RegisterAuthDto) {
    const passwordGenerator = await PasswordHashHelper.hash(dto.password);
    dto.password = passwordGenerator.hash;

    const createdUser = new this.userModel({
      ...dto,
      password_key: passwordGenerator.passKey,
    });
    const savedUser = await createdUser.save();

    return {
      message: 'User created successfully',
      data: savedUser,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    const isPasswordCorrect = await PasswordHashHelper.comparePassword(password, user.password_key, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException('Could not find user.');
    }

    return user;
  }

  private async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
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
