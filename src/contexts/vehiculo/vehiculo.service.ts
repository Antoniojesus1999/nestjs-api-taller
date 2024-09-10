import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Vehiculo } from "./schemas/vehiculo.schema";
import { IVehiculo } from "./interfaces/vehiculo.interfaz";
import { VehiculoMapper } from "./mappers/vehiculo.mapper";
import { VehiculoDto } from "./dtos/vehiculo.dto";
import { ReparacionDto } from "../reparacion/dtos/reparacion.dto";
import { ReparacionMapper } from "../reparacion/mappers/reparacion.mapper";

@Injectable()
export class VehiculoService {
  private readonly logger = new Logger(VehiculoService.name);

  constructor(
    @InjectModel(Vehiculo.name) private vehiculoModel: Model<Vehiculo>,
  ) {}

  async saveVehiculo(vehiculo: IVehiculo): Promise<VehiculoDto> {
    const newVehiculo = new this.vehiculoModel(vehiculo);

    return VehiculoMapper.toDto(await newVehiculo.save());
  }

  async updateVehiculo(id: string, vehiculo: IVehiculo): Promise<VehiculoDto> {
    const updatedVehiculo = await this.vehiculoModel.findByIdAndUpdate(id, vehiculo, {
      new: true,
    });

    if (!updatedVehiculo) {
      throw new NotFoundException("Vehiculo no encontrado");
    }

    return VehiculoMapper.toDto(updatedVehiculo);
  }

  async deleteVehículo(idVehiculo: string): Promise<void> {
    await this.vehiculoModel.findByIdAndDelete(idVehiculo);
  }

  async findVehiculoByMatricula(matricula: string): Promise<VehiculoDto> {
    const vehiculo = await this.vehiculoModel.findOne({ matricula });

    if (!vehiculo) {
      throw new NotFoundException("Vehículo no encontrado");
    }

    return VehiculoMapper.toDto(vehiculo);;
  }

  async findAll(): Promise<VehiculoDto[]> {
    const vehiculos = await this.vehiculoModel.find();

    return vehiculos.map(vehiculo => VehiculoMapper.toDto(vehiculo));
  }

  async findReparacionesByVehiculoId(idVehiculo: string): Promise<ReparacionDto[] | undefined> {
    // Buscar el taller por su ID y poblar las reparaciones
    const vehiculo = await this.vehiculoModel.findById(idVehiculo).populate('reparaciones').exec();

    if (!vehiculo) {
      throw new NotFoundException("Taller no encontrado");
    }

    return vehiculo.reparaciones?.map(reparacion => ReparacionMapper.toDto(reparacion)); // Devolver las reparaciones asociadas al vehiculo
  }

}
