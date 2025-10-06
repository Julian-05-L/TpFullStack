import {  Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';

@Controller('atleta')
export class AtletaController {
  constructor(private readonly atletaService: AtletaService) {}

  @Post()
  create(@Body() createAtletaDto: CreateAtletaDto) {
    return this.atletaService.create(createAtletaDto);
  }

  @Get()
  findAll() {
    return this.atletaService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.atletaService.findOne(nombre);
  }

  @Patch(':dni')
  update(@Param('dni') dni: number, @Body() updateAtletaDto: UpdateAtletaDto) {
    return this.atletaService.update(dni, updateAtletaDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: number) {
    return this.atletaService.remove(dni);
  }
}
