import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';

export enum Sort {
  CHEAPEST = 'cheap',
  FASTEST = 'fast',
  EARLIEST = 'early',
}

@Injectable()
export class RouteService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create a new route and ensure waypoints are in the correct order
  public async createRoute(data: CreateRouteDto) {
    return this.prismaService.route.create({
      data: {
        ...data,
      },
    });
  }

  public async findRoutes(
    departure: string,
    destination: string,
    start: Date,
    page: number = 1,
    limit: number = 5,
    sortBy: Sort,
  ) {
    console.log(departure, destination, start, page, limit, sortBy);

    const skip = (page - 1) * limit;
    const orderBy =
      sortBy === Sort.CHEAPEST
        ? ({ price: 'asc' } as const)
        : sortBy === Sort.FASTEST
          ? ({ duration: 'asc' } as const)
          : ({ start: 'asc' } as const);

    return this.prismaService.route.findMany({
      where: {
        start: {
          gte: start,
        },
        departure: {
          equals: departure,
        },
        destination: {
          equals: destination,
        },
      },
      orderBy,
      skip,
      take: limit,
    });
  }

  // Find a single route by ID
  public async findOne(id: string) {
    return this.prismaService.route.findUnique({
      where: { id },
    });
  }

  // Update a route
  public async updateRoute(id: string, data: CreateRouteDto) {
    return this.prismaService.route.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  // Delete a route
  public async deleteRoute(id: string) {
    return this.prismaService.route.delete({
      where: { id },
    });
  }
}
