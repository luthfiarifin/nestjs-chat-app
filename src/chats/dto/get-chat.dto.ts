import { ApiProperty } from "@nestjs/swagger";

export class GetChatDto {

    @ApiProperty({
        required: false,
    })
    readonly last_id: string;

    @ApiProperty({
        required: false,
        default: 10,
    })
    readonly limit: number = 10;

    constructor(data) {
        Object.assign(this, data);
    }
}
