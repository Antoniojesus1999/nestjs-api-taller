import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Modelo {
  @Prop({ required: true, trim: true })
  nombre: string;
  @Prop({ required: true, trim: true })
  slug: string;

  constructor(nombre: string, slug: string) {
    this.nombre = nombre;
    this.slug = slug;
  }
}

export const ModeloSchema = SchemaFactory.createForClass(Modelo);
