import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Animal } from './entities/animal.entity';
import { PaginatedAnimalResponseDto } from './dto/animal-response.dto';
import { AnimalPaginationQueryDto } from './dto/animal-pagination-query.dto';

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
  @ApiOperation({
    summary: 'Récupérer tous les animaux avec pagination et recherche',
  })
  @ApiOkResponse({ type: PaginatedAnimalResponseDto })
  findAll(@Query() query: AnimalPaginationQueryDto) {
    return this.animalService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un animal par son ID' })
  @ApiOkResponse({ type: Animal })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier les informations d'un animal" })
  @ApiOkResponse({ type: Animal })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un animal' })
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.remove(id);
  }
}
