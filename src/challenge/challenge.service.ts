import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengeService {
  create(createChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return `This action returns all challenge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}
