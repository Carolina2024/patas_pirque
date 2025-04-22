import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Genders } from 'src/common/enums/genders.enum';

export class RegisterUserDto {
  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name!: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName!: string;

  @ApiProperty({
    example: '2000-09-12',
    description: 'Fecha de nacimiento del usuario',
  })
  @IsDateString(
    {},
    {
      message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  birthDate!: string;

  @ApiProperty({
    example: '12345678',
    description: 'Documento Nacional de Identidad del usuario',
  })
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @Length(8, 8, { message: 'El DNI debe tener 8 caracteres' })
  dni!: string;

  @ApiProperty({
    description: 'Género del usuario',
    enum: Genders,
    example: Genders.MALE,
  })
  @IsString({ message: 'El género debe ser una cadena de texto' })
  @IsEnum(Genders, { message: 'El género debe ser un valor válido' })
  gender!: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Ingrese un correo con un formato válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  email!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'pass123**',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message:
      'La contraseña debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo (@$!%*?&)',
  })
  password!: string;
}
