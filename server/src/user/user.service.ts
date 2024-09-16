import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReturnUserObject } from './return-user.object';

import { hash } from 'argon2';
import { ValidatorService } from 'src/validator/validator.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private validator: ValidatorService,
  ) {}

  async byId(userId: string, selectObject: Prisma.UserSelect = {}) {
    await this.validator.validateUserExistence(userId);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...ReturnUserObject,
        ...selectObject,
      },
    });

    return user;
  }

  async updateProfile(id: string, dto: UserDto) {
    await this.validator.validateEmailUnique(dto.email);
    await this.validator.validateUserExistence(id);

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async deleteProfile(userId: string) {
    await this.validator.validateUserExistence(userId);

    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
