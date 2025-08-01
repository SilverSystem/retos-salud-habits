import { Injectable, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model} from 'mongoose';
import {CreateUserChallengeDto} from '../dtos/create-user-challenge.dto';
import { User } from '../models/user.schema';
import { UserChallenge } from '../models/userChallenge.schema';
import { Challenge } from '../models/challenge.schema';
import { CreateChallengeDto } from 'src/dtos/create-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(
              @InjectConnection() private readonly connection: Connection,
              @InjectModel(UserChallenge.name) private userChallengeModel: Model<UserChallenge>,
              @InjectModel(Challenge.name) private challengeModel: Model<Challenge>,
              @InjectModel(User.name) private userModel: Model<User>
            ) {}

  async create(challenge: CreateChallengeDto) {
    const createdChallenge = new this.challengeModel(challenge);
    return await createdChallenge.save();
  }

  async createUserChallenge(userChallenge: CreateUserChallengeDto) {
    const { userId, challengeId } = userChallenge;
    try {
      const user = await this.userModel.findById(userId);
      const challenge = await this.challengeModel.findById(challengeId);
      
      if (!user || !challenge) {
        throw new NotFoundException('User or Challenge not found');
      }
      
      const existing = await this.userChallengeModel.findOne({ userId, challengeId });
      if (existing) {
        throw new ConflictException('User already registered in this challenge');
      }
      const userChallenge = new this.userChallengeModel({ userId, challengeId });
      return await userChallenge.save();
    } catch (err) {
      throw new HttpException('Error on transaction:', err);
    }
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
