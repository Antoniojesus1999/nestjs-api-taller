import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Empleado, EmpleadoSchema } from "../../taller/schemas/empleado.schema";
import { Reparacion } from "@src/contexts/reparacion/schemas/reparacion.schema";

@Schema({ collection: "talleres", timestamps: true })
export class Taller extends Document {
  @Prop({ required: true, trim: true, unique: true })
  cif: string;
  @Prop({ required: true, trim: true })
  nombre: string;
  @Prop({ required: true, trim: true })
  direccion: string;
  @Prop({ required: true, trim: true })
  cp: string;
  @Prop({ required: true, trim: true })
  municipio: string;
  @Prop({ required: true, trim: true })
  provincia: string;
  @Prop({ required: true, trim: true })
  riia: string;
  @Prop({ required: true, trim: true })
  telefono: string;
  @Prop({ trim: true })
  fax: string;
  @Prop({ trim: true })
  email: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: Date.now })
  updatedAt: Date;
  @Prop({ type: [EmpleadoSchema] })
  empleados?: Empleado[];
  reparaciones?: Reparacion[];

  constructor(
    cif: string,
    nombre: string,
    direccion: string,
    cp: string,
    municipio: string,
    provincia: string,
    riia: string,
    telefono: string,
    fax: string,
    email: string,
    empleados: [Empleado],
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.cif = cif;
    this.nombre = nombre;
    this.direccion = direccion;
    this.cp = cp;
    this.municipio = municipio;
    this.provincia = provincia;
    this.riia = riia;
    this.telefono = telefono;
    this.fax = fax;
    this.email = email;
    this.empleados = empleados;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export const TallerSchema = SchemaFactory.createForClass(Taller);

TallerSchema.virtual('reparaciones', {
  ref: 'Reparacion',  // El nombre del modelo de referencia
  localField: '_id',  // El campo local en el schema de Taller
  foreignField: 'taller',  // El campo en Reparacion que almacena la referencia
});

// Habilitar las propiedades virtuales
TallerSchema.set('toObject', { virtuals: true });
TallerSchema.set('toJSON', { virtuals: true });