import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HealthMetricType } from '../models/healthMetric.schema';

export enum ChallengeType{
  ACCUMULATIVE = 'accumulative',
  DAILY = 'daily',
};
@Schema()
export class Challenge extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: HealthMetricType, required: true })
  type: HealthMetricType;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  goal: number;

  @Prop({ enum: ChallengeType, required: true })
  goalType: ChallengeType;

  @Prop()
  dailyGoal?: number;

  @Prop()
  requiredDays?: number;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

ChallengeSchema.pre('validate', function (next) {
  if (this.goalType === 'daily') {
    if (this.dailyGoal == null || this.requiredDays == null) {
      return next(
        new Error(
          'dailyGoal and requiredDays are required for daily challenges.'
        )
      );
    }
  }
  next();
});
