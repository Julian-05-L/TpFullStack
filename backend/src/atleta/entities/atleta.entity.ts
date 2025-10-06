import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ciudad } from '../../ciudad/entities/ciudad.entity';

export type AtletaDocument = Atleta & Document;

@Schema()
export class Atleta {
  @Prop({ required: true, unique: true })
  dni: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  tiempo: string;

  @Prop({ required: true })
  posicion: number;

  @Prop({ type: Types.ObjectId, ref: 'Ciudad' })
  ciudad: Ciudad;
}

export const AtletaSchema = SchemaFactory.createForClass(Atleta);
