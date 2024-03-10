import { IWork } from "./work.interfaz";

export interface IRepair {
  description: string;
  date: Date;
  works: [IWork];
}

export interface IRepairAndIdClient extends IRepair {
  idClient: string;
}
