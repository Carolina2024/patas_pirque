import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Ingrese un correo con un formato válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  email!: string;

  @IsString({message: "La contraseña debe ser una cadena de caracteres"})
  @IsNotEmpty({message: 'La contraseña es requerida'})
  password!: string;
}
