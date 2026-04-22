import { ApiProperty } from '@nestjs/swagger';
import { Animal } from '../entities/animal.entity';

class PaginationMetaDto {
  @ApiProperty()
  totalItems!: number;
  @ApiProperty()
  itemCount!: number;
  @ApiProperty()
  itemsPerPage!: number;
  @ApiProperty()
  totalPages!: number;
  @ApiProperty()
  currentPage!: number;
}

export class PaginatedAnimalResponseDto {
  @ApiProperty({ type: [Animal] })
  items!: Animal[];

  @ApiProperty()
  pagination!: PaginationMetaDto;
}
