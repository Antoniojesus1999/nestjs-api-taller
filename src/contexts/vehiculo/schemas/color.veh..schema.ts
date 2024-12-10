import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class ColorVeh {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  colorR: string;

  @Prop({ required: true, trim: true })
  colorG: string;

  @Prop({ required: true, trim: true })
  colorB: string;

  constructor(nombre: string, colorR: string, colorG: string, colorB: string) {
    this.nombre = nombre;
    this.colorR = colorR;
    this.colorG = colorG;
    this.colorB = colorB;
  }
}

export const ColorVehSchema = SchemaFactory.createForClass(ColorVeh);
