import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({message: 'Name is required '})
  name!: string;

  @IsEmail()
  @Validate(() => ({ message: 'Invalid email' }))
  email!: string;

  @IsString()
  @MinLength(6, {message: "Password most be '6' characters long "})
  password!: string;
}