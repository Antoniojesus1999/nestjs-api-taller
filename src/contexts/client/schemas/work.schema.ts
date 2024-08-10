import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Work {
  @Prop({ trim: true })
  description: string;

  constructor(description: string) {
    this.description = description;
  }
}

export const WorkSchema = SchemaFactory.createForClass(Work);
