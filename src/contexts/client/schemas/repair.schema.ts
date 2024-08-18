import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Damage, DamageSchema } from "./damage.schema";
import { Work, WorkSchema } from "./work.schema";

@Schema({ timestamps: true })
export class Repair {
  @Prop()
  dateStart: Date;

  @Prop()
  dateEnd: Date;

  @Prop()
  fuel: number;

  @Prop()
  km: number;

  @Prop({ trim: true })
  insurance: string;

  @Prop({ trim: true })
  chassis: string;

  @Prop({ trim: true })
  poliza: string;

  @Prop({ type: [WorkSchema] })
  works: Work[];

  @Prop({ type: [DamageSchema] })
  damages: Damage[];

  constructor(
    dateStart: Date,
    dateEnd: Date,
    fuel: number,
    km: number,
    insurance: string,
    chassis: string,
    poliza: string,
    works: [Work],
    damages: [Damage],
  ) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.fuel = fuel;
    this.km = km;
    this.insurance = insurance;
    this.chassis = chassis;
    this.poliza = poliza;
    this.works = works;
    this.damages = damages;
  }
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
