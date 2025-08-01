import { IsNotEmpty, IsString, IsDate, IsNumber, IsEnum } from "class-validator";
import { ChallengeType } from "src/models/challenge.schema";
import { HealthMetricType } from 'src/models/healthMetric.schema';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(HealthMetricType)
  type: HealthMetricType;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  goal: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ChallengeType)
  goalType: ChallengeType;

}