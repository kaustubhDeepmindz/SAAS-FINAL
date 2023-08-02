import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
   firstName: string;

  @IsNotEmpty()
  @IsString()
   lastName: string;

  @IsNotEmpty()
  @IsEmail()
   email: string;

  @IsNotEmpty()
  @IsString()
   password: string;

  @IsNotEmpty()
  @IsString()
   gender: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  email:string;

  @IsNotEmpty()
  password:string;
}
