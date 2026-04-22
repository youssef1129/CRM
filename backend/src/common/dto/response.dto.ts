import { ApiProperty } from '@nestjs/swagger';

class MetaDto {
  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  path!: string;
}

export class ResponseDto<T> {
  data!: T;

  @ApiProperty()
  meta!: MetaDto;
}

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

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  items!: T[];

  @ApiProperty()
  meta!: PaginationMetaDto;
}
