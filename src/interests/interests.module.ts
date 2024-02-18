import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestCommand } from './interests.command';
import { MongooseModule } from '@nestjs/mongoose';
import { Interest, InterestSchema } from './schemas/interest.schema';
import { InterestsController } from './interests.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Interest.name, schema: InterestSchema }]),
  ],
  providers: [InterestCommand, InterestsService],
  controllers: [InterestsController],
})
export class InterestsModule { }
