import { IsDateString, IsEmail, IsIn, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({message: 'El nombre es requerido'})
  name!: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName!: string;

  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  birthDate!: string;

  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @Length(8, 8, { message: 'El DNI debe tener 8 caracteres' })
  dni!: string;

  @IsString({ message: 'El género debe ser una cadena de texto' })
  @IsIn(['Masculino', 'Femenino', 'Otro'], { message: 'El género debe ser Masculino, Femenino u Otro' })
  gender!: string;

  @IsEmail({}, {message: "Ingrese un correo con un formato válido"})
  @IsNotEmpty({message: "El correo es requerido"})
  email!: string;

  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message: 'La contraseña debe tener mínimo 6 caracteres, al menos una letra, un número y un símbolo (@$!%*?&)',
  })
  password!: string;

}