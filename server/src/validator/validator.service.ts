import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserObject } from 'src/user/return-user.object';

@Injectable()
export class ValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUserExistence(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: ReturnUserObject,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async validateCredentials(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = await verify(user.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async validateEmailUnique(email: string) {
    const userWithSameEmail = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new BadRequestException('User with this email already exists');
    }
  }
}
