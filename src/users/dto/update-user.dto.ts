import { CreateUserDto } from './create-user.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty()
    readonly about: string;

    @ApiProperty()
    readonly birthday: Date;

    @ApiProperty()
    readonly height: number;

    @ApiProperty()
    readonly weight: number;

    @ApiProperty()
    readonly interests: number[];
}
