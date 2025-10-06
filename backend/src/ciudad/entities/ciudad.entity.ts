import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Atleta } from '../../atleta/entities/atleta.entity';

export type CiudadDocument = Ciudad & Document;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Ciudad {
  @Prop({ required: true, unique: true })
  nombre: string;
  atletas: Atleta[];
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);

CiudadSchema.virtual('atletas', {
  ref: 'Atleta',
  localField: '_id',
  foreignField: 'ciudad',
});
