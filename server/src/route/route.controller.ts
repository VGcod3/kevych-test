import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RouteService } from './route.service';

import { CreateRouteDto } from './dto/create-route.dto';
import { GetRouteDto } from './dto/get-routes.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Route')
@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() routeData: CreateRouteDto) {
    return this.routeService.createRoute(routeData);
  }

  @UsePipes(new ValidationPipe())
  @Get()
  async findAll(@Query() query: GetRouteDto) {
    return this.routeService.findRoutes(
      query.departure,
      query.destination,
      new Date(query.start),
      query.page,
      query.limit,
      query.sortBy,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.routeService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(@Param('id') id: string, @Body() routeData: CreateRouteDto) {
    return this.routeService.updateRoute(id, routeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.routeService.deleteRoute(id);
  }
}
