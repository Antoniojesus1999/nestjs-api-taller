import { IModelo } from "./modelo.interfaz";

export interface IMarca {
  id: string;
  nombre: string;
  slug: string;
  modelos: IModelo[];
  createdAt: Date;
  updatedAt: Date;
}
