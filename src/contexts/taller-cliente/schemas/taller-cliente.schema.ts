import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TallerCliente extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Taller' })
  idTaller: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cliente' })
  idCliente: Types.ObjectId;

  constructor(
    idTaller  : Types.ObjectId,
    idCliente : Types.ObjectId,
  ) {
    super();
    this.idTaller  = idTaller;
    this.idCliente = idCliente;
  }
}

export const TallerClienteSchema = SchemaFactory.createForClass(TallerCliente);