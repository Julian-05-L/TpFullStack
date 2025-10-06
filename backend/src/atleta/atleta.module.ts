import { Module } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Atleta, AtletaSchema } from './entities/atleta.entity';
import { Ciudad, CiudadSchema } from '../ciudad/entities/ciudad.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Atleta.name, schema: AtletaSchema },
      { name: Ciudad.name, schema: CiudadSchema },
    ]),
  ],
  controllers: [AtletaController],
  providers: [AtletaService],
})
export class AtletaModule {}
