import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Reparacion } from "@src/contexts/reparacion/schemas/reparacion.schema";

import { Punto, PuntoSchema } from "./punto.schema";

@Schema({ collection: "clientes", timestamps: true })
export class Cliente extends Document {
  @Prop({ required: true, trim: true, unique: true })
  nif: string;
  @Prop({ trim: true })
  nombre: string;
  @Prop({ trim: true })
  apellido1: string;
  @Prop({ trim: true })
  apellido2: string;
  @Prop({ trim: true })
  telefono: string;
  @Prop({ trim: true, unique: true })
  email: string;
  @Prop({ type: [PuntoSchema] })
  firma: Punto[];
  @Prop({ trim: true })
  firmaBase64: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  reparaciones?: Reparacion[];

  constructor(
    nif: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    telefono: string,
    email: string,
    firma: Punto[],
    firmaBase64: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.nif = nif;
    this.nombre = nombre;
    this.apellido1 = apellido1;
    this.apellido2 = apellido2;
    this.telefono = telefono;
    this.email = email;
    this.firma = firma;
    this.firmaBase64 = firmaBase64;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);

ClienteSchema.virtual("reparaciones", {
  ref: "Reparacion", // El nombre del modelo de referencia
  localField: "_id", // El campo local en el schema de Cliente
  foreignField: "cliente", // El campo en Reparacion que almacena la referencia
});

ClienteSchema.set("toObject", { virtuals: true });
ClienteSchema.set("toJSON", { virtuals: true });
