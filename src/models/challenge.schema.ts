import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HealthMetricType } from 'src/models/healthMetric.schema';

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
  goal: number; // La meta total para completar el reto

  @Prop({ enum: ChallengeType, required: true })
  goalType: ChallengeType; // Tipo de métrica para la meta del reto
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
