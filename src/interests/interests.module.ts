import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestCommand } from './interests.command';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from './schemas/interest.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interest.name, schema: InterestSchema }]),
  ],
  providers: [InterestCommand, InterestsService],
})
export class InterestsModule { }
