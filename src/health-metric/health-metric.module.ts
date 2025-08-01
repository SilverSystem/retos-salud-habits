import { Module } from '@nestjs/common';
import { HealthMetricService } from './health-metric.service';
import { HealthMetricController } from './health-metric.controller';
import { HealthMetric, HealthMetricSchema } from 'src/models/healthMetric.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeService } from 'src/challenge/challenge.service';

@Module({
  imports: [
      MongooseModule.forFeature([
        { name: HealthMetric.name, schema: HealthMetricSchema },
      ]),
    ],
  controllers: [HealthMetricController],
  providers: [HealthMetricService, ChallengeService],
})
export class HealthMetricModule {}
