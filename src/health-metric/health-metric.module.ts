import { Module } from '@nestjs/common';
import { HealthMetricService } from './health-metric.service';
import { HealthMetricController } from './health-metric.controller';
import { HealthMetric, HealthMetricSchema } from '../models/healthMetric.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeService } from '../challenge/challenge.service';
import { Challenge, ChallengeSchema } from 'src/models/challenge.schema';
import { User, UserSchema } from 'src/models/user.schema';
import { UserChallenge, UserChallengeSchema } from 'src/models/userChallenge.schema';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: UserChallenge.name, schema: UserChallengeSchema },
        { name: Challenge.name, schema: ChallengeSchema },
        { name: User.name, schema: UserSchema },
        { name: HealthMetric.name, schema: HealthMetricSchema },
      ]),
      BullModule.registerQueue({
        name: 'health-metric-queue',
      }),
    ],
  controllers: [HealthMetricController],
  providers: [HealthMetricService, ChallengeService],
})
export class HealthMetricModule {}
