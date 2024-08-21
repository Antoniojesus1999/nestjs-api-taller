import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { Vehiculo } from "./schemas/vehiculo.schema";
import { IVehiculo } from "./interfaces/vehiculo.interfaz";

@Injectable()
export class VehiculoService {
  private readonly logger = new Logger(VehiculoService.name);

  constructor(
    @InjectModel(Vehiculo.name) private vehiculoModel: Model<Vehiculo>,
  ) {}

  async saveVehiculo(vehiculo: IVehiculo): Promise<Vehiculo> {
    const newVehiculo = new this.vehiculoModel(vehiculo);
    return await newVehiculo.save();
  }

  async updateVehiculo(id: string, vehiculo: IVehiculo): Promise<Vehiculo> {
    const updatedVehiculo = await this.vehiculoModel.findByIdAndUpdate(id, vehiculo, {
      new: true,
    });

    if (!updatedVehiculo) {
      throw new NotFoundException("Vehiculo no encontrado");
    }

    return updatedVehiculo;
  }

  async deleteVehículo(idVehiculo: ObjectId): Promise<void> {
    await this.vehiculoModel.findByIdAndDelete(idVehiculo);
  }

  async findVehiculoByMatricula(matricula: string): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoModel.findOne({ matricula });

    if (!vehiculo) {
      throw new NotFoundException("Vehículo no encontrado");
    }

    return vehiculo as Vehiculo;
  }

  async findAll(): Promise<Vehiculo[]> {
    const vehiculos = await this.vehiculoModel.find();
        
    return vehiculos;
  }

}
