import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ObjectId,
  PaginateModel,
  Types,
} from "mongoose";
import { Reparacion } from "./schemas/reparacion.schema";
import { IReparacion } from "./interfaces/reparacion.interfaz";
import { ReparacionDto } from "./dtos/reparacion.dto";
import { ReparacionMapper } from "./mappers/reparacion.mapper";
import { ITrabajo } from "./interfaces/trabajo.interfaz";
import { IDanyo } from "./interfaces/danyo.interfaz";

@Injectable()
export class ReparacionService {
  private readonly logger = new Logger(ReparacionService.name);

  constructor(
    @InjectModel(Reparacion.name) private reparacionModel: PaginateModel<Reparacion>,
  ) {}

  async saveReparacion(reparacion: IReparacion): Promise<ReparacionDto> {
    const newReparacion = new this.reparacionModel(reparacion);
    newReparacion.taller = new Types.ObjectId(reparacion.taller);
    newReparacion.cliente = new Types.ObjectId(reparacion.cliente);
    newReparacion.vehiculo = new Types.ObjectId(reparacion.vehiculo);
    
    return ReparacionMapper.toDto(await newReparacion.save());
  }

  async updateReparacion(id: string, reparacion: IReparacion): Promise<ReparacionDto> {
    const updatedReparacion = await this.reparacionModel.findByIdAndUpdate(id, reparacion, {
      new: true,
    });

    if (!updatedReparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    return ReparacionMapper.toDto(updatedReparacion);
  }

  async addTrabajoToReparacion(idReparacion: string, trabajo: ITrabajo): Promise<ReparacionDto> {
    const reparacion = await this.reparacionModel.findById(idReparacion);

    if (!reparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    reparacion.trabajos.push(trabajo); // Add the new employee to the 'empleados' array

    return ReparacionMapper.toDto(await reparacion.save());
  }

  async addDanyoToReparacion(idReparacion: string, danyo: IDanyo): Promise<ReparacionDto> {
    const reparacion = await this.reparacionModel.findById(idReparacion);

    if (!reparacion) {
      throw new NotFoundException("Reparacion no encontrada");
    }

    reparacion.danyos.push(danyo); // Add the new employee to the 'empleados' array

    return ReparacionMapper.toDto(await reparacion.save());
  }

  async deleteReparacion(idReparacion: ObjectId): Promise<void> {
    await this.reparacionModel.findByIdAndDelete(idReparacion);
  }

}
