import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  departure: string;

  @IsDateString()
  start: Date;

  @IsString()
  destination: string;

  @IsDateString()
  end: Date;

  @IsNumber()
  duration: number;
}
