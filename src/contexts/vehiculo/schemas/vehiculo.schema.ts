import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "vehiculos", timestamps: true })
export class Vehiculo extends Document {
  @Prop({ required: true, trim: true, unique: true })
  matricula: string;
  @Prop({ required: true, trim: true })
  marca: string;
  @Prop({ required: true, trim: true })
  modelo: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
 
  constructor(
    matricula : string,
    marca     : string,
    modelo    : string,
    createdAt : Date,
    updatedAt : Date,
   ) {
    super();
    this.matricula = matricula;
    this.marca     = marca;
    this.modelo    = modelo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}

export const VehiculoSchema = SchemaFactory.createForClass(Vehiculo);
