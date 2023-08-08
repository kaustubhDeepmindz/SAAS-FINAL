import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class UserServiceStatus extends AbstractDocument {

    @Prop({ required: true })
    user: string

    @Prop({ required: true })
    service: string

    @Prop({ required: true })
    status: boolean

    @Prop()
    isLimited: boolean

    @Prop({ required: true })
    credits_alloted: number

    @Prop({ required: true })
    api_keys: string

};

export const UserServiceStatusSchema = SchemaFactory.createForClass(UserServiceStatus);
