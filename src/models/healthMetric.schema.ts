import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum HealthMetricType {
  STEPS = 'steps',
  SLEEP = 'sleep',
  CARDIO_POINTS = 'cardio_points',
};
@Schema({ timestamps: true })
export class HealthMetric extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ enum: HealthMetricType, required: true })
  type: HealthMetricType;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;
}

export const HealthMetricSchema = SchemaFactory.createForClass(HealthMetric);
HealthMetricSchema.index({ userId: 1, type: 1, date: 1 }, { unique: true });
