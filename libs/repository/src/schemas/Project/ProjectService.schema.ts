import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ProjectService extends AbstractDocument {
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

export const ProjectServiceSchema = SchemaFactory.createForClass(ProjectService);
