import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Challenge extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['steps', 'sleep', 'cardio_points'], required: true })
  type: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  goal: number; // La meta total para completar el reto
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
