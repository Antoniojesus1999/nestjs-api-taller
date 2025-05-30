import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { ColorVehiculo } from "@src/contexts/color-vehiculo/schemas/color-vehiculo.schema";
import { Reparacion } from "@src/contexts/reparacion/schemas/reparacion.schema";

@Schema({ collection: "vehiculos", timestamps: true })
export class Vehiculo extends Document {
  @Prop({ required: true, trim: true, unique: true })
  matricula: string;
  @Prop({ required: true, trim: true })
  marca: string;
  @Prop({ required: true, trim: true })
  modelo: string;
  @Prop({ type: ColorVehiculo })
  color: ColorVehiculo;
  @Prop({ required: false, trim: true })
  combustible: string;
  reparaciones?: Reparacion[];
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(
    matricula: string,
    marca: string,
    modelo: string,
    conbustible: string,
    color: ColorVehiculo,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.combustible = conbustible;
    this.color = color;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const VehiculoSchema = SchemaFactory.createForClass(Vehiculo);

VehiculoSchema.virtual("reparaciones", {
  ref: "Reparacion", // El nombre del modelo de referencia
  localField: "_id", // El campo local en el schema de Vehiculo
  foreignField: "vehiculo", // El campo en Reparacion que almacena la referencia
});

VehiculoSchema.set("toObject", { virtuals: true });
VehiculoSchema.set("toJSON", { virtuals: true });
