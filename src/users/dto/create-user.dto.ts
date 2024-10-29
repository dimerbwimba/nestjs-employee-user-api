import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['USER', 'ADMIN'], {
    message: 'Valid role required',
  })
  role: 'USER' | 'ADMIN';
}
