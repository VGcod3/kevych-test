import { Body, Controller, Delete, Get, Put } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') userId: string) {
    return this.userService.byId(userId);
  }

  @Auth()
  @Put('profile')
  async updateProfile(@Body() dto: UserDto, @CurrentUser('id') id: string) {
    return this.userService.updateProfile(id, dto);
  }

  @Auth()
  @Delete('profile')
  async deleteProfile(@CurrentUser('id') userId: string) {
    return this.userService.deleteProfile(userId);
  }
}
