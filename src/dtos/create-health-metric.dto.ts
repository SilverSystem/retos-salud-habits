
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HealthMetricType } from '../models/healthMetric.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHealthMetricDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ enum: HealthMetricType })
  @IsNotEmpty()
  @IsString()
  @IsEnum(HealthMetricType)
  type: HealthMetricType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  date: Date;
}
