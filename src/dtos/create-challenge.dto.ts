import { IsNotEmpty, IsString, IsDate, IsNumber, IsEnum, Min, ValidateIf } from "class-validator";
import { ChallengeType } from "../models/challenge.schema";
import { HealthMetricType } from '../models/healthMetric.schema';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateChallengeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: HealthMetricType })
  @IsNotEmpty()
  @IsString()
  @IsEnum(HealthMetricType)
  type: HealthMetricType;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty({ description: 'meta total (usado solo en retos acumulativos)' })
  @IsNotEmpty()
  @IsNumber()
  goal: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(ChallengeType)
  goalType: ChallengeType;

  @ApiPropertyOptional({ description: 'Requerido solo si el valor de goalType es daily' })
  @ValidateIf((o) => o.goalType === ChallengeType.DAILY)
  @IsNumber()
  @Min(1)
  dailyGoal?: number;

  @ApiPropertyOptional({ description: 'Requerido solo si el valor de goalType es daily' })
  @ValidateIf((o) => o.goalType === ChallengeType.DAILY)
  @IsNumber()
  @Min(1)
  requiredDays?: number;

}