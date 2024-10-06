import { IReparacion } from "@src/contexts/reparacion/interfaces/reparacion.interfaz";

export interface ICliente {
  id: string;
  nif: string;
  nombre: string;
  apellido_1: string;
  apellido_2: string;
  telefono: string;
  email: string;
  reparaciones: IReparacion[];
  createdAt: Date;
  updatedAt: Date;
}
