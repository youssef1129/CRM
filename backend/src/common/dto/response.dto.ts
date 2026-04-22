import { ApiProperty } from '@nestjs/swagger';

class MetaDto {
  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  path!: string;
}

export class ResponseDto<T> {
  @ApiProperty()
  data!: T | null;

  @ApiProperty({ type: MetaDto })
  meta!: MetaDto;
}

export class VoidResponseDto {
  @ApiProperty({ nullable: true })
  data!: null;

  @ApiProperty({ type: MetaDto })
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
