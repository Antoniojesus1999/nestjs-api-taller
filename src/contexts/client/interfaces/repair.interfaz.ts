import { IWork } from "./work.interfaz";

export interface IRepair {
  description: string;
  dateStart: Date;
  works: IWork[];
}

export interface IRepairAndIdClient extends IRepair {
  idClient: string;
}
