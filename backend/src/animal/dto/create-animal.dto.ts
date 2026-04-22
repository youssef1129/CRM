import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { Species } from 'src/common/enums';
export class CreateAnimalDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  age!: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  height!: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  weight!: number;

  @IsEnum(Species)
  @IsNotEmpty()
  species!: Species;

  @IsInt()
  @IsNotEmpty()
  clientId!: number;
}
