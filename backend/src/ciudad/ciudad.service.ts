import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad, CiudadDocument } from './entities/ciudad.entity';
import { Atleta, AtletaDocument } from '../atleta/entities/atleta.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectModel(Ciudad.name) private ciudadModel: Model<CiudadDocument>,
    @InjectModel(Atleta.name) private atletaModel: Model<AtletaDocument>,
  ) {}

  create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const createdCiudad = new this.ciudadModel(createCiudadDto);
    return createdCiudad.save();
  }

  findAll() {
    return this.ciudadModel.find().populate('atletas').exec();
  }

  findOne(nombre: string) {
    return this.ciudadModel.find({ nombre : nombre}).populate('atletas').exec();
  }

  update(nombre: string, updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadModel
      .findOneAndUpdate({ nombre: nombre }, updateCiudadDto, { new: true })
      .exec();
  }

  async remove(nombre: string) {
    const ciudad = await this.ciudadModel.findOne({ nombre }).exec();

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con nombre "${nombre}" no encontrada.`);
    }

    await this.atletaModel.deleteMany({ ciudad: ciudad._id }).exec();

    return this.ciudadModel.findByIdAndDelete(ciudad._id).exec();
  }
}