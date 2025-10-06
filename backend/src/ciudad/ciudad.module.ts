import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from './entities/ciudad.entity';
import { Atleta, AtletaSchema } from '../atleta/entities/atleta.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ciudad.name, schema: CiudadSchema },
      { name: Atleta.name, schema: AtletaSchema },
    ]),
  ],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
