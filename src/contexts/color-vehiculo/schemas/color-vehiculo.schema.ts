import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "color-vehiculo", timestamps: true })
export class ColorVehiculo extends Document {
  @Prop({ required: true, trim: true })
  nombre: string;
  @Prop({ required: true, trim: true })
  colorR: string;
  @Prop({ required: true, trim: true })
  colorG: string;
  @Prop({ required: true, trim: true })
  colorB: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    nombre: string,
    colorR: string,
    colorG: string,
    colorB: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.nombre = nombre;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const ColorVehiculoSchema = SchemaFactory.createForClass(ColorVehiculo);
