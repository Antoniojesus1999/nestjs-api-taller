import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Punto {
  @Prop({ required: true, trim: true })
  dx: string;

  @Prop({ required: true, trim: true })
  dy: string;

  @Prop({ required: true, trim: true })
  pressure: string;

  @Prop({ required: true, trim: true })
  type: string;

  constructor(dx: string, dy: string, pressure: string, type: string) {
    this.dx = dx;
    this.dy = dy;
    this.pressure = pressure;
    this.type = type;
  }
}

export const PuntoSchema = SchemaFactory.createForClass(Punto);
