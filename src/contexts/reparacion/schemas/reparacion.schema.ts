import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Trabajo, TrabajoSchema } from "./trabajo.schema";
import { Danyo, DanyoSchema } from "./danyo.schema";

@Schema({ collection: "reparaciones", timestamps: true })
export class Reparacion extends Document {
  @Prop({ required: true, default: Date.now })
  fecEntrada: Date;
  @Prop({ required: false, trim: true })
  combustible: string;
  @Prop({ required: false, trim: true })
  kilometros: string;
  @Prop({ required: false, trim: true })
  seguro: string;
  @Prop({ required: false, trim: true })
  chasis: string;
  @Prop({ type: [TrabajoSchema] })
  trabajos: Trabajo[];
  @Prop({ type: [DanyoSchema] })
  danyos: Danyo[];
  @Prop({ type: Types.ObjectId, ref: 'Taller', required: true })
  taller: Types.ObjectId; 
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    fecEntrada: Date,
    combustible: string,
    kilometros: string,
    seguro: string,
    chasis: string,
    trabajos: Trabajo[],
    danyos: Danyo[],
    taller: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.fecEntrada = fecEntrada;
    this.combustible = combustible;
    this.kilometros = kilometros;
    this.seguro = seguro;
    this.chasis = chasis;
    this.trabajos = trabajos;
    this.danyos = danyos;
    this.taller = taller;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const ReparacionSchema = SchemaFactory.createForClass(Reparacion);
