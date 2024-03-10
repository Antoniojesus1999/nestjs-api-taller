import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Work } from "./work.schema";

@Schema()
export class Repair {
  @Prop({ required: true, trim: true })
  description: string;
  @Prop()
  date: Date;
  @Prop()
  works: [Work];

  constructor(description: string, date: Date, works: [Work]) {
    this.description = description;
    this.date = date;
    this.works = works;
  }
}

export const ClientSchema = SchemaFactory.createForClass(Repair);
