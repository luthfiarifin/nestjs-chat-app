import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
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
        required: true
    })
    password: string;

    @Prop()
    about: string;

    @Prop()
    birthday: Date;

    @Prop()
    height: number;

    @Prop()
    weight: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
