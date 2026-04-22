import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('animals')
@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer un nouvel animal' })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les animaux avec leurs maîtres' })
  findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un animal par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier les informations d'un animal" })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un animal' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.remove(id);
  }
}
