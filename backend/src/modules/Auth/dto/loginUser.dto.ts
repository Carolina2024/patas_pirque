import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
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
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password!: string;
}
