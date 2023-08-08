import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema({ versionKey: false, timestamps:true })
export class PaymentDetails extends AbstractDocument {
    @Prop()
    payment_id: string
    @Prop()
    order_id: string
    @Prop()
    payment_signature: string
    
}

export const PaymentDetailsSchema = SchemaFactory.createForClass(PaymentDetails);
