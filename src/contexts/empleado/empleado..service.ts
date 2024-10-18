import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToClass } from "class-transformer";
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

  async saveEmpleado(empleado: EmpleadoDto): Promise<EmpleadoDto> {
    const newEmpleado = new this.empleadoModel(empleado);
    const savedEmpleado = await newEmpleado.save();
    return plainToClass(EmpleadoDto, savedEmpleado.toObject());
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

  async findEmpleadoByEmail(email: string): Promise<Empleado> {
    try {
      const empleado = await this.empleadoModel.findOne({ email }).exec();
      if (empleado === null) {
        throw new NotFoundException(
          "Empleado con email: " + email + " no existe",
        );
      }
      return empleado;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Error interno del servidor");
    }
  }
}
