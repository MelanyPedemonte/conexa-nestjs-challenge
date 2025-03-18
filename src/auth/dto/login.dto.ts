import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'userExample',
    description: 'Nombre de usuario',
    required: true,
  })
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'passwordExample',
    description: 'Contraseña de usuario',
    required: true,
  })
  password: string;
}
