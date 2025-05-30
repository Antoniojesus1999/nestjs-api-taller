import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { Danyo, DanyoSchema } from "./danyo.schema";
import { Trabajo, TrabajoSchema } from "./trabajo.schema";

@Schema({ collection: "reparaciones", timestamps: true })
export class Reparacion extends Document {
  @Prop({ default: Date.now })
  fecEntrada: Date;
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
  @Prop({ type: Types.ObjectId, ref: "Taller", required: true })
  taller: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: "Cliente", required: true })
  cliente: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: "Vehiculo", required: true })
  vehiculo: Types.ObjectId;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    fecEntrada: Date,
    kilometros: string,
    seguro: string,
    chasis: string,
    trabajos: Trabajo[],
    danyos: Danyo[],
    taller: Types.ObjectId,
    cliente: Types.ObjectId,
    vehiculo: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.fecEntrada = fecEntrada;
    this.kilometros = kilometros;
    this.seguro = seguro;
    this.chasis = chasis;
    this.trabajos = trabajos;
    this.danyos = danyos;
    this.taller = taller;
    this.cliente = cliente;
    this.vehiculo = vehiculo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const ReparacionSchema = SchemaFactory.createForClass(Reparacion);

// Pre-save hook para establecer la fecha actual si fecEntrada es null
ReparacionSchema.pre("save", function (next) {
  if (this.fecEntrada === null) {
    this.fecEntrada = new Date();
  }
  next();
});
