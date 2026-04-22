import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
} from 'class-validator';
import { Civility } from 'src/common/enums';

export class CreateClientDto {
  @IsEnum(Civility)
  @IsNotEmpty()
  civility!: Civility;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber('FR')
  @IsNotEmpty()
  phone!: string;
}
