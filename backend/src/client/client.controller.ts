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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients avec leurs animaux' })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un client' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.remove(id);
  }
}
