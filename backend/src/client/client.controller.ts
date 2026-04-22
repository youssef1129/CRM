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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { PaginatedClientResponseDto } from './dto/client-response.dto';
import { ResponseDto } from '../common/dto/response.dto';

@ApiTags('clients')
@ApiExtraModels(ResponseDto, Client, PaginatedClientResponseDto)
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiCreatedResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Client) } } },
      ],
    },
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer tous les clients avec pagination et recherche',
  })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: { $ref: getSchemaPath(PaginatedClientResponseDto) },
          },
        },
      ],
    },
  })
  findAll(@Query() query: PaginationQueryDto) {
    return this.clientService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par son ID' })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Client) } } },
      ],
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un client' })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        { properties: { data: { $ref: getSchemaPath(Client) } } },
      ],
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiOkResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(id);
  }
}
