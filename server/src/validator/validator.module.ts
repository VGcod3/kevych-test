import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ValidatorService } from './validator.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ValidatorService, JwtService],
  exports: [ValidatorService],
})
export class ValidatorModule {}
