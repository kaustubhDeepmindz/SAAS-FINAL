import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserCredits extends AbstractDocument {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  credits: number;

  @Prop()
  last_recharge: string;
}

export const UserCreditsSchema = SchemaFactory.createForClass(UserCredits);
