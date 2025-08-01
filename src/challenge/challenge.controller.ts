import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import {CreateUserChallengeDto} from '../dtos/create-user-challenge.dto';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(+id);
  }

  @Post()
  async create(@Body() challenge: CreateChallengeDto) {
    return await this.challengeService.create(challenge);
  }
  @Post('user-challenge')
  createUserChallenge(@Body() userChallenge: CreateUserChallengeDto) {
    return this.challengeService.createUserChallenge(userChallenge);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChallengeDto) {
    return this.challengeService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengeService.remove(+id);
  }
}
