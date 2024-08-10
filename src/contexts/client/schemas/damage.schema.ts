import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Damage {
  @Prop()
  positionX: string;

  @Prop()
  positionY: string;

  @Prop()
  origWidth: string;

  @Prop()
  origHeight: string;

  constructor(positionX: string, positionY: string, origWidth: string, origHeight: string) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.origWidth = origWidth;
    this.origHeight = origHeight;
  }
}

export const WorkSchema = SchemaFactory.createForClass(Work);
