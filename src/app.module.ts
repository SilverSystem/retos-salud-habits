import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengeModule } from './challenge/challenge.module';
import { UserModule } from './user/user.module';
import { HealthMetricModule } from './health-metric/health-metric.module';
import { BullModule } from '@nestjs/bullmq';
import { HealthMetricWorker } from './queues/health-metric.worker';
import { Challenge, ChallengeSchema } from './models/challenge.schema';
import { HealthMetric, HealthMetricSchema } from './models/healthMetric.schema';
import { User, UserSchema } from './models/user.schema';
import { UserChallenge, UserChallengeSchema } from './models/userChallenge.schema';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST') ?? 'localhost',
          port: parseInt(configService.get('REDIS_PORT') ?? '6379', 10),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'health-metric-queue',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGO_USERNAME')}:${configService.get('MONGO_PASSWORD')}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}`,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: UserChallenge.name, schema: UserChallengeSchema },
      { name: Challenge.name, schema: ChallengeSchema },
      { name: User.name, schema: UserSchema },
      { name: HealthMetric.name, schema: HealthMetricSchema },
    ]),
    ChallengeModule,
    UserModule,
    HealthMetricModule,
  ],
  providers: [HealthMetricWorker],
})
export class AppModule {}
