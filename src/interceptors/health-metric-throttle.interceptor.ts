import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { Request } from 'express';
import * as crypto from 'crypto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class HealthMetricThrottleInterceptor implements NestInterceptor {
  constructor(
    @InjectQueue('health-metric-queue')
    private readonly queue: Queue,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { userId, type, date, value } = req.body;

    const jobKey = this.generateLockKey({ userId, type, date });
    const jobOptions = {
      jobId: jobKey,
      removeOnComplete: true,
      removeOnFail: true,
      attempts: 1,
    };

    return from(
      this.queue.add('record-health-metric', { userId, type, date, value }, jobOptions).then(() => {
        return next.handle();
      }).catch(err => {
        if (err?.message?.includes('Job with the same ID already exists')) {
          throw new ConflictException('Registro en proceso, intenta de nuevo pronto.');
        }
        throw err;
      }),
    );
  }

  private generateLockKey(input: any): string {
    const base = `${input.userId}-${input.type}-${input.date}`;
    const hash = crypto.createHash('sha256');
    hash.update(base);
    return hash.digest('hex');
  }
}
