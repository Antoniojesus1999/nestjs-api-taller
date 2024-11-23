import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Modelo, ModeloSchema } from "./modelo.schema";

@Schema({ collection: "marcas", timestamps: true })
export class Marca extends Document {
  @Prop({ required: true, trim: true })
  nombre: string;
  @Prop({ required: true, trim: true })
  slug: string;
  @Prop({ type: [ModeloSchema] })
  modelos?: Modelo[];
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    nombre: string,
    slug: string,
    modelos: [Modelo],
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.nombre = nombre;
    this.slug = slug;
    this.modelos = modelos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const MarcaSchema = SchemaFactory.createForClass(Marca);
