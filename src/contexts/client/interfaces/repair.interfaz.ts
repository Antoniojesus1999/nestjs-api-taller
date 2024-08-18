import { IDamage } from "./damage.interfaz";
import { IWork } from "./work.interfaz";

export interface IRepair {
  dateStart: Date;
  dateEnd: Date;
  fuel: number;
  km: number;
  insurance: string;
  chassis: string;
  poliza: string;
  works: IWork[];
  damages: IDamage[];
}

export interface IRepairAndIdClient extends IRepair {
  idClient: string;
}
