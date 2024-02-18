import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Interest } from "src/interests/schemas/interest.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {

    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: true,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
        select: false,
    })
    password: string;

    @Prop({
        required: true,
        select: false,
    })
    password_key: string;

    @Prop()
    about: string;

    @Prop()
    birthday: Date;

    @Prop()
    height: number;

    @Prop()
    weight: number;

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Interest.name, autopopulate: true }])
    interests: Interest[]
}

export const UserSchema = SchemaFactory.createForClass(User);
