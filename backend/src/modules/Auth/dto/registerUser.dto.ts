import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({message: 'El nombre es requerido'})
  name!: string;

  @IsEmail({}, {message: "Ingrese un correo con un formato válido"})
  @IsNotEmpty({message: "El correo es requerido"})
  email!: string;

  @IsString({message: "La contraseña debe ser una cadena de caracteres"})
  @MinLength(6, {message: "La contraseña debe ser de al menos 6 caracteres"})
  password!: string;
}