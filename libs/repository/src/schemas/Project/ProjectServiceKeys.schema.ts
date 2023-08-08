import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ProjectServiceKeys extends AbstractDocument {
  @Prop({ required: true })
  project_id: string;

  @Prop({ required: true , unique: true })
  key_id: string;

  @Prop({ required: true })
  status: boolean;

}

export const ProjectServiceKeysSchema = SchemaFactory.createForClass(ProjectServiceKeys);
