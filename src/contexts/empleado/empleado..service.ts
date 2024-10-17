import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";

import { EmpleadoDto } from "../taller/dtos/empleado.dto";
import { Empleado } from "../taller/schemas/empleado.schema";
import { IEmpleado } from "./interfaces/empleado.interfaz";
import { EmpleadoMapper } from "./mappers/empleado.mapper";

@Injectable()
export class EmpleadoService {
  private readonly logger = new Logger(EmpleadoService.name);
  constructor(
    @InjectModel(Empleado.name)
    private empleadoModel: Model<Empleado>,
  ) {}

  async saveEmpleado(empleado: IEmpleado): Promise<EmpleadoDto> {
    const newEmpleado = new this.empleadoModel(empleado);

    return EmpleadoMapper.toDto(await newEmpleado.save());
  }

  async updateEmpleado(id: string, empleado: IEmpleado): Promise<EmpleadoDto> {
    const updateEmpleado = await this.empleadoModel.findByIdAndUpdate(
      id,
      empleado,
      {
        new: true,
      },
    );

    if (!updateEmpleado) {
      throw new NotFoundException("Empleado no encontrado");
    }

    return EmpleadoMapper.toDto(updateEmpleado);
  }

  async deleteEmpleado(idEmpleado: ObjectId): Promise<void> {
    await this.empleadoModel.findByIdAndDelete(idEmpleado);
  }

  async findEmpleadoById(id: string): Promise<EmpleadoDto[]> {
    try {
      const empleados = await this.empleadoModel.find({ taller: id }).exec();
      if (!empleados || empleados.length === 0) {
        throw new NotFoundException("Empleado no encontrado");
      }
      return empleados.map(empleado => EmpleadoMapper.toDto(empleado));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Error interno del servidor");
    }
  }
}
