import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Species } from 'src/common/enums';
export class CreateAnimalDto {
  @ApiProperty({ example: 'Médor' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  age!: number;

  @ApiProperty({ example: 45.5 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  height!: number;

  @ApiProperty({ example: 12.2 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  weight!: number;

  @ApiProperty({ enum: Species, example: 'chien' })
  @IsEnum(Species)
  @IsNotEmpty()
  species!: Species;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId!: number;
}
