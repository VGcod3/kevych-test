import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long.',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must have a lowercase, uppercase, number, and special character.',
    },
  )
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'refreshToken',
  })
  @IsString()
  refreshToken: string;
}
