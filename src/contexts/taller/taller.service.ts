import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Types } from "mongoose";

import { Taller } from "./schemas/taller.schema";
import { TallerDto } from "./dtos/taller.dto";

@Injectable()
export class TallerService {
  private readonly logger = new Logger(TallerService.name);

  constructor(
    @InjectModel(Taller.name) private tallerModel: Model<Taller>,
  ) {}

  async saveTaller(taller: TallerDto): Promise<Taller> {
    const newTaller = new this.tallerModel(taller);
    return await newTaller.save();
  }

  async updateTaller(id: string, taller: TallerDto): Promise<Taller> {
		const updatedTaller = await this.tallerModel.findByIdAndUpdate(id, taller, { new: true });

    if (!updatedTaller) {
      throw new NotFoundException('Taller no encontrado');      
    }

    return updatedTaller;
	}

  async deleteTaller(idTaller: ObjectId): Promise<void> {
    await this.tallerModel.findByIdAndDelete(idTaller);
  }

  async findTallerByCif(cif: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({ cif });
    
    if (!taller) {
      throw new NotFoundException('Taller no encontrado');
    }
    
    return taller as Taller;
  }

  async findByEmpleado(email: string): Promise<Taller> {
    const taller = await this.tallerModel.findOne({
      'empleados.email': email
    });
    
    if (!taller) {
      throw new NotFoundException('Taller o empleado no encontrado');
    }
    
    return taller as Taller;
  }

  async findAll(): Promise<Taller[]> {
    const talleres = await this.tallerModel.find();
        
    return talleres;
  }

}
