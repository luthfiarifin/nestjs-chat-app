import { Controller, Get } from '@nestjs/common';
import { InterestsService } from './interests.service';

@Controller('interests')
export class InterestsController {

    constructor(private readonly interestsService: InterestsService) { }

    @Get()
    findOne() {
        return this.interestsService.getAll();
    }
}
