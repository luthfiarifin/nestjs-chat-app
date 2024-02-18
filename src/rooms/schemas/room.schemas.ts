import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { RoomType } from "../enums/room-type.enum";
import { User } from "src/users/schemas/user.schemas";

@Schema({
    timestamps: true,
    versionKey: false,
    toJSON: ({
        transform(_, ret, __) {
            return new RoomDocument(ret);
        },
    })
})
export class Room {

    @Prop()
    name: string;

    @Prop({ enum: RoomType, default: RoomType.PERSONAL })
    type: RoomType;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name, autopopulate: true }])
    members: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);

export class RoomDocument {
    _id: Types.ObjectId;
    name: string;
    type: RoomType;
    members: User[];

    constructor(props: Partial<RoomDocument>) {
        this._id = props._id;
        this.members = props.members;
        this.name = props.name;
        this.type = props.type;

        if (this.type == RoomType.PERSONAL) {
            this.name = this.members.find((member: any) => member._id.toString() !== this._id.toString()).name;
        }
    }
}
