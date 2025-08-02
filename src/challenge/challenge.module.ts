import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema} from '../models/challenge.schema';
import { User, UserSchema } from '../models/user.schema';
import { UserChallenge, UserChallengeSchema } from '../models/userChallenge.schema';
import { HealthMetric, HealthMetricSchema } from '../models/healthMetric.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: UserChallenge.name, schema: UserChallengeSchema },
          { name: Challenge.name, schema: ChallengeSchema },
          { name: User.name, schema: UserSchema },
          { name: HealthMetric.name, schema: HealthMetricSchema },
        ]),
      ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
  exports: [ChallengeService]
})
export class ChallengeModule {}
