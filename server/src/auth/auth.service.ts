import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { ValidatorService } from 'src/validator/validator.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { capitalize } from 'src/utils/capitalize';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private validator: ValidatorService,
  ) {}

  async register(dto: RegisterDto) {
    await this.validator.validateEmailUnique(dto.email);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,

        password: await hash(dto.password),
      },
    });

    const tokens = this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validator.validateCredentials(dto);
    const tokens = this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.validateJwt(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = this.generateTokens(user.id);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async validateJwt(token: string) {
    try {
      const result = this.jwt.verify(token);

      if (!result) {
        throw new UnauthorizedException(
          'Token verification failed: Invalid token!',
        );
      }

      return result;
    } catch (error) {
      // mostly token expired
      throw new UnauthorizedException(capitalize(error.message) + '!');
    }
  }

  private generateTokens(id: string) {
    const accessToken = this.jwt.sign(
      { id },
      {
        expiresIn: '15s',
      },
    );

    const refreshToken = this.jwt.sign(
      { id },
      {
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  private returnUserFields(user: User) {
    const { id, name, email } = user;

    return {
      id,
      name,
      email,
    };
  }
}
