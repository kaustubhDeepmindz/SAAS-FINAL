import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Project extends AbstractDocument {
  @Prop({ required: true })
  name: string;

  @Prop()
  sector: string;

  @Prop({ required: true, lowercase: true })
  user: string;

  @Prop({ required: true })
  credits_alloted: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
