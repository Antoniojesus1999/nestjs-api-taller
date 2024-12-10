import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class ClienteVehiculo extends Document {
  @Prop({ type: Types.ObjectId, ref: "Cliente" })
  idCliente: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Vehiculo" })
  idVehiculo: Types.ObjectId;

  constructor(idCliente: Types.ObjectId, idVehiculo: Types.ObjectId) {
    super();
    this.idCliente = idCliente;
    this.idVehiculo = idVehiculo;
  }
}

export const ClienteVehiculoSchema =
  SchemaFactory.createForClass(ClienteVehiculo);
