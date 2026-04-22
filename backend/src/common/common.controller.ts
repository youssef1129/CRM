import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Civility, Species } from './enums';

@ApiTags('common')
@Controller('common')
export class CommonController {
  @Get('civilities')
  @ApiOperation({ summary: 'Récupérer la liste des civilités' })
  getCivilities() {
    return Object.values(Civility);
  }

  @Get('species')
  @ApiOperation({ summary: "Récupérer la liste des espèces d'animaux" })
  getSpecies() {
    return Object.values(Species);
  }
}
