import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from 'src/models/challenge.schema';
import { User } from 'src/models/user.schema';
import { UserChallenge } from 'src/models/userChallenge.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Challenge.name, schema: ChallengeSchema },
          { name: UserChallenge.name, schema: UserChallenge },
          { name: User.name, schema: User },
        ]),
      ],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
