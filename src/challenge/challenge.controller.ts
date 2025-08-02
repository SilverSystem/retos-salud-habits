import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import {CreateUserChallengeDto} from '../dtos/create-user-challenge.dto';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Challenge } from '../models/challenge.schema';
@ApiTags('Challenges')
@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Get()
  findAll() {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.challengeService.findOne(id);
  }

  @Post()
   @ApiCreatedResponse({
    description: 'Reto creado exitosamente',
    type: Challenge,
  })
  create(@Body() challenge: CreateChallengeDto) {
    return this.challengeService.create(challenge);
  }
  @Post('user-challenge')
  createUserChallenge(@Body() userChallenge: CreateUserChallengeDto) {
    return this.challengeService.createUserChallenge(userChallenge);
  }
}
