import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, optimisticConcurrency: true })
export class Work {
  @Prop({ trim: true })
  nameEmployeePerformedWork: string;

  @Prop()
  date: Date;

  @Prop()
  hours: number;
  constructor(nameEmployeePerformedWork: string, date: Date, hours: number) {
    this.nameEmployeePerformedWork = nameEmployeePerformedWork;
    this.date = date;
    this.hours = hours;
  }
}

export const WorkSchema = SchemaFactory.createForClass(Work);
