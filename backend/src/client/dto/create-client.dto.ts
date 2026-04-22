import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Civility } from 'src/common/enums';

export class CreateClientDto {
  @ApiProperty({ enum: Civility, example: 'M.' })
  @IsEnum(Civility)
  @IsNotEmpty()
  civility!: Civility;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'jean.dupont@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '0612345678' })
  @IsPhoneNumber('FR')
  @IsNotEmpty()
  phone!: string;
}
