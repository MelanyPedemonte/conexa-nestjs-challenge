import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDto {
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

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'true',
    description: 'Usuario administrador',
    required: false,
  })
  isAdmin: boolean = false;
}
