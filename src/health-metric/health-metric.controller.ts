import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { HealthMetricService } from './health-metric.service';
import { HealthMetricThrottleInterceptor } from '../interceptors/health-metric-throttle.interceptor';
import { CreateHealthMetricDto } from '../dtos/create-health-metric.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Metrics')
@Controller('health-metric')
export class HealthMetricController {
  constructor(private readonly healthMetricService: HealthMetricService) {}

  @Post()
  @UseInterceptors(HealthMetricThrottleInterceptor)
  create(@Body() _: CreateHealthMetricDto) {
    return;
  }

  @Get()
  findAll() {
    return this.healthMetricService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthMetricService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthMetricDto) {
    return this.healthMetricService.update(id, updateHealthMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthMetricService.remove(id);
  }
}
