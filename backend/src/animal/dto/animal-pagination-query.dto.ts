import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Species } from 'src/common/enums';

export class AnimalPaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: Species,
    description: "Filtrer par espèce d'animal",
  })
  @IsOptional()
  @IsEnum(Species)
  species?: Species;
}
