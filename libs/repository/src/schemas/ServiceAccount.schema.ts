import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ServiceAccount extends AbstractDocument {
    @Prop({ required: true, unique: true })
    account_id: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop()
    credits: number;
}

export const ServiceAccountSchema = SchemaFactory.createForClass(ServiceAccount);
