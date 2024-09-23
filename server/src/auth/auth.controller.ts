import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Cookies } from './cookie.decorator';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

const refreshExpirationDate = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res()
    res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('refresh', result.refreshToken, {
      httpOnly: true,
      expires: refreshExpirationDate,
      sameSite: 'lax',
    });

    return res.send({
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  @Get('login/access-token')
  async getNewTokens(
    @Cookies('refresh') refresh: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.getNewTokens(refresh);

    res.cookie('refresh', result.refreshToken, {
      httpOnly: true,
      expires: refreshExpirationDate,
      sameSite: 'strict',
    });

    return res.send({
      accessToken: result.accessToken,
    });
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);

    res.cookie('refresh', result.refreshToken, {
      httpOnly: true,
      expires: refreshExpirationDate,
      sameSite: 'lax',
    });

    return res.send({
      accessToken: result.accessToken,
      user: result.user,
    });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh');
    return res.send({ message: 'Logged out' });
  }
}
