import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthMetricService {
  create(createHealthMetricDto) {
    return 'This action adds a new healthMetric';
  }

  findAll() {
    return `This action returns all healthMetric`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthMetric`;
  }

  update(id: number, updateHealthMetricDto) {
    return `This action updates a #${id} healthMetric`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthMetric`;
  }
}
