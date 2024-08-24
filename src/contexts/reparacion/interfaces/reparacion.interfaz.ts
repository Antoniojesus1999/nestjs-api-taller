import { ObjectId } from "mongoose";
import { IDanyo } from "./danyo.interfaz";
import { ITrabajo } from "./trabajo.interfaz";

export interface IReparacion {
  id: string;
  fecEntrada: Date;
  combustible: string;
  kilometros: string;
  seguro: string;
  chasis: string;
  trabajos: ITrabajo[];
  danyos: IDanyo[];
  taller: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
