import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Danyo {
  @Prop({ required: true, trim: true })
  positionX: string;

  @Prop({ required: true, trim: true })
  positionY: string;

  @Prop({ required: true, trim: true })
  origWidth: string;

  @Prop({ required: true, trim: true })
  origHeight: string;

  constructor(
    positionX: string,
    positionY: string,
    origWidth: string,
    origHeight: string,
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.origWidth = origWidth;
    this.origHeight = origHeight;
  }
}

export const DanyoSchema = SchemaFactory.createForClass(Danyo);
