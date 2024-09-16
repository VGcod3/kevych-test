import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'argon2';
import { ValidatorService } from 'src/validator/validator.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { capitalize } from 'src/utils/capitalize';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private validator: ValidatorService,
  ) {}

  async register(dto: AuthDto) {
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

  async login(dto: AuthDto) {
    const user = await this.validator.validateCredentials(dto);
    const tokens = this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string, refresh: string) {
    const result = await this.validateJwt(refreshToken);

    console.log(refresh);

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = this.generateTokens(user.id);

    return {
      user: this.returnUserFields(user),
      accessToken: tokens.accessToken,
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
        expiresIn: '20s',
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
