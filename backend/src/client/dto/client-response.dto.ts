import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../entities/client.entity';

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

export class PaginatedClientResponseDto {
  @ApiProperty({ type: [Client] })
  items!: Client[];

  @ApiProperty()
  pagination!: PaginationMetaDto;
}
