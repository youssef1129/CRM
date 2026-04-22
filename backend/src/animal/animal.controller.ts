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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Animal } from './entities/animal.entity';
import { PaginatedAnimalResponseDto } from './dto/animal-response.dto';
import { AnimalPaginationQueryDto } from './dto/animal-pagination-query.dto';
import { ResponseDto } from '../common/dto/response.dto';

@ApiTags('animals')
@ApiExtraModels(ResponseDto, Animal, PaginatedAnimalResponseDto)
@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @ApiOperation({ summary: 'Enregistrer un nouvel animal' })
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Animal) } } },
      ],
    },
  })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les animaux avec pagination et recherche',
  })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(PaginatedAnimalResponseDto) },
          },
        },
      ],
    },
  })
  findAll(@Query() query: AnimalPaginationQueryDto) {
    return this.animalService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un animal par son ID' })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Animal) } } },
      ],
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Modifier les informations d'un animal" })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Animal) } } },
      ],
    },
  })
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
