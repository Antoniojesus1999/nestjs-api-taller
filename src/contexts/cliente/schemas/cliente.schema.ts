import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "clientes", timestamps: true })
export class Cliente extends Document {
  @Prop({ required: true, trim: true, unique: true })
  nif: string;
  @Prop({ trim: true })
  nombre: string;
  @Prop({ trim: true })
  apellido_1: string;
  @Prop({ trim: true })
  apellido_2: string;
  @Prop({ required: true, trim: true })
  telefono: string;
  @Prop({ trim: true })
  email: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    nif: string,
    nombre: string,
    apellido_1: string,
    apellido_2: string,
    telefono: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.nif = nif;
    this.nombre = nombre;
    this.apellido_1 = apellido_1;
    this.apellido_2 = apellido_2;
    this.telefono = telefono;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
