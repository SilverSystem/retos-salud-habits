
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { HealthMetricType } from 'src/models/healthMetric.schema';

export class CreateHealthMetricDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(HealthMetricType)
  type: HealthMetricType;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  goal: number; // Optional goal for the health metric, if applicable
}
