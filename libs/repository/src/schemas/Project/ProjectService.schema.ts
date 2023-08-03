import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserService extends AbstractDocument {
  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  status: boolean;

  @Prop()
  isLimited?: boolean;

  @Prop({ required: true })
  credits_alloted: number;

  @Prop({ required: true })
  api_keys: string[];
}

export const UserServiceSchema = SchemaFactory.createForClass(UserService);
