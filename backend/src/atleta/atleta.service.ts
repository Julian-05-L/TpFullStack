import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { Atleta, AtletaDocument } from './entities/atleta.entity';
import { Ciudad, CiudadDocument } from '../ciudad/entities/ciudad.entity';

@Injectable()
export class AtletaService {
  constructor(
    @InjectModel(Atleta.name) private atletaModel: Model<AtletaDocument>,
    @InjectModel(Ciudad.name) private ciudadModel: Model<CiudadDocument>,
  ) {}

  async create(createAtletaDto: CreateAtletaDto): Promise<Atleta> {
    const nombreCiudad = createAtletaDto.ciudad;

    const ciudad = await this.ciudadModel.findOne({ nombre: nombreCiudad }).exec();

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con nombre "${nombreCiudad}" no encontrada.`);
    }

    const atletaData = {
      ...createAtletaDto,
      ciudad: ciudad._id,
    };

    try {
      const createdAtleta = new this.atletaModel(atletaData);
      return await createdAtleta.save();
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error al guardar el atleta:', error);
      // Throw a more generic error to the client
      throw new InternalServerErrorException('Ocurrió un error al crear el atleta.');
    }
  }

  findAll() {
    // Usamos .populate('ciudad') para que tambien traiga la informacion de la ciudad relacionada
    return this.atletaModel.find().populate('ciudad').exec();
  }

  findOne(nombre: string) {
    return this.atletaModel.find({nombre: nombre}).populate('ciudad').exec();
  }

  async update(dni: number, updateAtletaDto: UpdateAtletaDto) {
    const updateData: any = { ...updateAtletaDto };

    if (updateAtletaDto.ciudad) {
      const nombreCiudad = updateAtletaDto.ciudad as any;
      const ciudad = await this.ciudadModel.findOne({ nombre: nombreCiudad }).exec();

      if (!ciudad) {
        throw new NotFoundException(`Ciudad con nombre "${nombreCiudad}" no encontrada.`);
      }
      
      updateData.ciudad = ciudad._id;
    }

    const updatedAtleta = await this.atletaModel
      .findOneAndUpdate({ dni: dni }, updateData, { new: true })
      .exec();

    if (!updatedAtleta) {
      throw new NotFoundException(`Atleta con DNI "${dni}" no encontrado.`);
    }

    return updatedAtleta;
  }

  async remove(dni: number) {
    const result = await this.atletaModel.findOneAndDelete({ dni: dni }).exec();
    if (!result) {
      throw new NotFoundException(`Atleta con DNI "${dni}" no encontrado.`);
    }
    return result;
  }
}
