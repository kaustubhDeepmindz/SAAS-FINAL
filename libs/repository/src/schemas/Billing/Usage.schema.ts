import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Usage extends AbstractDocument {
    @Prop()
    service_name: string

    @Prop()
    route: string

    @Prop()
    api_key: string

    @Prop({ type: Date, default: Date.now })
    startTime: Date

    @Prop()
    method: string

    @Prop()
    host: string

    @Prop()
    completion_time: number
};

export const UsageSchema = SchemaFactory.createForClass(Usage);