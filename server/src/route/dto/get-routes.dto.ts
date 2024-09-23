import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Sort } from '../route.service';

export class GetRouteDto {
  @IsString()
  departure: string;

  @IsDateString()
  start: string;

  @IsString()
  destination: string;

  @IsNumber()
  page = 1;

  @IsNumber()
  limit = 5;

  @IsString()
  sortBy: Sort = Sort.EARLIEST;
}
