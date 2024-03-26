import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Work, WorkSchema } from "./work.schema";

@Schema({ timestamps: true })
export class Repair {
  @Prop({ required: true, trim: true })
  description: string;
  @Prop()
  date: Date;
  @Prop({ type: [WorkSchema] })
  works: Work[];

  constructor(description: string, date: Date, works: [Work]) {
    this.description = description;
    this.date = date;
    this.works = works;
  }
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
