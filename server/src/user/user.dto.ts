import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}
