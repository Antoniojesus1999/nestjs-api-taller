import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Work, WorkSchema } from "./work.schema";

@Schema({ timestamps: true })
export class Repair {
  @Prop()
  dateStart: Date;

  @Prop()
  dateEnd: Date;

  @Prop({ type: [WorkSchema] })
  works: Work[];

  @Prop({ type: [DamageSchema] })
  damages: Damage[];

  constructor(
    dateStart: Date,
    dateEnd: Date,
    works: [Work],
    damages: [Damage]
  ) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
    this.works = works;
    this.damages = damages;
  }
}

export const RepairSchema = SchemaFactory.createForClass(Repair);
