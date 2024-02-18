import { Injectable } from "@nestjs/common";
import { Command } from "nestjs-command";
import { InterestsService } from "./interests.service";

@Injectable()
export class InterestCommand {

    constructor(private readonly interestsService: InterestsService) { }

    @Command({
        command: 'seed:interests',
        describe: 'seeding interests',
    })
    async seed() {
        await this.interestsService.removeAll();

        const interests = [
            'Gym',
            'Reading',
            'Music',
            'Travel',
            'Cooking',
            'Hiking',
            'Camping',
            'Swimming',
            'Cycling',
            'Running',
            'Yoga',
            'Meditation',
            'Photography',
            'Painting',
            'Dancing',
            'Singing',
            'Writing',
            'Gardening',
            'Fishing',
            'Hunting',
            'Gaming',
            'Movies',
            'TV Shows',
            'Fashion',
            'Shopping',
        ];
        const result = await this.interestsService.bulkInsert(interests);

        console.log(result);
    }
}