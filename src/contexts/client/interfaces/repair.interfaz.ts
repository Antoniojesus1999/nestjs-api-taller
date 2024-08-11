import { IWork } from "./work.interfaz";
import { IDamage } from "./damage.interfaz";

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
