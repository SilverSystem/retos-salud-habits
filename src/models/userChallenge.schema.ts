import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserChallenge extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Challenge', required: true })
  challengeId: Types.ObjectId;

  @Prop({ default: 0 })
  total: number; // Acumulado del usuario

  @Prop({ default: 0 })
  progress: number; // En porcentaje (0-100)

  @Prop()
  completedAt?: Date; // Fecha en que se completó el reto (si aplica)
}

export const UserChallengeSchema = SchemaFactory.createForClass(UserChallenge);
UserChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true });
