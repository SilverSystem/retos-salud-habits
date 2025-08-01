import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Challenge extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: ['steps', 'sleep', 'cardio_points'] })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
