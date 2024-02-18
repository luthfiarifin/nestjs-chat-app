import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type InterestDocument = HydratedDocument<Interest>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Interest {

    @Prop({
        required: true
    })
    name: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
