import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";

export class RegisterUserDto {
  @IsString({message: "El nombre debe ser una cadena de caracteres"})
  @IsNotEmpty({message: 'El nombre es requerido'})
  name!: string;

  @IsEmail()
  @Validate(() => ({ message: 'Correo inválido' }))
  email!: string;

  @IsString({message: "La contraseña debe ser una cadena de caracteres"})
  @MinLength(6, {message: "La contraseña debe ser de al menos 6 caracteres"})
  password!: string;
}