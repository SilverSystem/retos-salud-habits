import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthMetricService {
  create(createHealthMetricDto) {
    return 'This action adds a new healthMetric';
  }

  findAll() {
    return `This action returns all healthMetrics`;
  }

  findOne(id: string) {
    return `This action returns a #${id} healthMetric`;
  }

  update(id: string, updateHealthMetricDto) {
    return `This action updates a #${id} healthMetric`;
  }

  remove(id: string) {
    return `This action removes a #${id} healthMetric`;
  }
}
