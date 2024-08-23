import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

@Schema()
export class TallerCliente extends Document {
  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Taller' })
  idTaller: ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Cliente' })
  idCliente: ObjectId;

  constructor(
    idTaller  : ObjectId,
    idCliente : ObjectId,
  ) {
    super();
    this.idTaller  = idTaller;
    this.idCliente = idCliente;
  }
}

export const TallerClienteSchema = SchemaFactory.createForClass(TallerCliente);