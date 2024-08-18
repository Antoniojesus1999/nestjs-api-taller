import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Empleado, EmpleadoSchema } from "../../taller/schemas/empleado.schema";

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
  telefono: string
  @Prop({ trim: true })
  fax: string;
  @Prop({ trim: true })
  email: string;
  @Prop({ type: [EmpleadoSchema] })
  empleados: Empleado[];

  constructor(
    cif       : string,
    nombre    : string,
    direccion : string,
    cp        : string,
    municipio : string,
    provincia : string,
    riia      : string,
    telefono  : string,
    fax       : string,
    email     : string,
    empleados : Empleado[],
  ) {
    super();
    this.cif       = cif;
    this.nombre    = nombre;
    this.direccion = direccion;
    this.cp        = cp;
    this.municipio = municipio;
    this.provincia = provincia;
    this.riia      = riia;
    this.telefono  = telefono;
    this.fax       = fax;
    this.email     = email;
    this.empleados = empleados;
  }
}

export const TallerSchema = SchemaFactory.createForClass(Taller);
