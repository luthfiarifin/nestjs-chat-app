import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interest } from './schemas/interest.schema';
import { Model } from 'mongoose';

@Injectable()
export class InterestsService {

  constructor(
    @InjectModel(Interest.name) private interestModel: Model<Interest>,
  ) { }

  async getAll() {
    return await this.interestModel.find().exec();
  }

  async bulkInsert(interests: string[]) {
    const interestsToInsert = interests.map(interest => ({ name: interest }));
    const insertedInterests = await this.interestModel.insertMany(interestsToInsert);

    return {
      message: 'Interests created successfully',
      data: insertedInterests
    };
  }

  async removeAll() {
    const removedInterests = await this.interestModel.deleteMany({}).exec();

    return {
      message: 'Interests removed successfully',
      data: removedInterests,
    };
  }
}
