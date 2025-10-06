import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  create(@Body() createCiudadDto: CreateCiudadDto) {
    return this.ciudadService.create(createCiudadDto);
  }

  @Get()
  findAll() {
    return this.ciudadService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nombre: string) {
    return this.ciudadService.findOne(nombre);
  }

  @Patch(':nombre')
  update(@Param('nombre') nombre: string, @Body() updateCiudadDto: UpdateCiudadDto) {
    return this.ciudadService.update(nombre, updateCiudadDto);
  }

  @Delete(':nombre')
  remove(@Param('nombre') nombre: string) {
    return this.ciudadService.remove(nombre);
  }
}
