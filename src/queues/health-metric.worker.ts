import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthMetric} from '../models/healthMetric.schema';
import { ChallengeService } from '../challenge/challenge.service';

@Processor('health-metric-queue')
export class HealthMetricWorker extends WorkerHost {
  constructor(
    @InjectModel(HealthMetric.name) private healthMetricModel: Model<HealthMetric>,
    private challengeService: ChallengeService
  ) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    const { userId, type, date, value } = job.data;

    const existing = await this.healthMetricModel.findOne({ userId, type, date });

    if (existing) {
      existing.value += value;
      await existing.save();
    } else {
      await this.healthMetricModel.create({ userId, type, date, value });
    }
    await this.challengeService.updateUserChallenge({ userId, type, date, value });
  }
}
