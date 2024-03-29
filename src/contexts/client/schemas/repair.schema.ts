import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Work, WorkSchema } from "./work.schema";

@Schema({ timestamps: true })
export class Repair {
  @Prop({ required: true, trim: true })
  description: string;
  @Prop()
  dateStart: Date;
  @Prop()
  dateEnd: Date;

  @Prop()
  fuel: number;
  @Prop()
  km: number;
  @Prop()
  insurance: string;
  @Prop()
  chassis: string;
  @Prop()
  poliza: string;
  @Prop({ type: [WorkSchema] })
  works: Work[];

  constructor(
    description: string,
    dateStart: Date,
    dateEnd: Date,
    fuel: number,
    km: number,
    insurance: string,
    chassis: string,
    poliza: string,
    works: [Work],
  ) {
    this.description = description;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.fuel = fuel;
    this.km = km;
    this.insurance = insurance;
    this.chassis = chassis;
    this.poliza = poliza;
    this.works = works;
  }
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
