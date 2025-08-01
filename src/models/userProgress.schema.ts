import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserProgress extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Challenge', required: true })
  challengeId: Types.ObjectId;

  @Prop({ required: true, enum: ['steps', 'sleep', 'cardio_points'] })
  type: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);

// Índice único para evitar registros duplicados por usuario/tipo/fecha
UserProgressSchema.index({ userId: 1, type: 1, date: 1 }, { unique: true });
