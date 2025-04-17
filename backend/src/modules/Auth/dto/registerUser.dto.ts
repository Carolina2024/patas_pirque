import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({message: 'El nombre es requerido'})
  name!: string;

  @IsEmail()
  @Validate(() => ({ message: 'Correo inválido' }))
  email!: string;

  @IsString()
  @MinLength(6, {message: "La contraseña debe ser de al menos 6 caracteres"})
  password!: string;
}