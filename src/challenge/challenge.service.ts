import { Injectable, ConflictException, NotFoundException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {CreateUserChallengeDto} from '../dtos/create-user-challenge.dto';
import { User } from '../models/user.schema';
import { UserChallenge } from '../models/userChallenge.schema';
import { Challenge, ChallengeType } from '../models/challenge.schema';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { CreateHealthMetricDto } from '../dtos/create-health-metric.dto';
import { HealthMetric } from '../models/healthMetric.schema';
@Injectable()
export class ChallengeService {
  constructor(
              @InjectModel(UserChallenge.name) private userChallengeModel: Model<UserChallenge>,
              @InjectModel(Challenge.name) private challengeModel: Model<Challenge>,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(HealthMetric.name) private healthMetricModel: Model<HealthMetric>,
            ) {}

  async create(challenge: CreateChallengeDto) {
    try {
      const createdChallenge = new this.challengeModel(challenge);
      return await createdChallenge.save();
    } catch (err) {
      throw new HttpException('Error creating challenge', err);
    }
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

  async findAll() {
    try {
      return await this.challengeModel.find({ startDate: { $lte: new Date() }, endDate: { $gte: new Date() } }).exec();
    } catch (error) {
      throw new HttpException('Error fetching challenges', error);
    }
  }

  async findAllUserChallenges(userId: string) {
    try {
      return await this.userChallengeModel.find({ userId }).exec();
    } catch (error) {
      throw new HttpException('Error fetching user challenges', error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.challengeModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('Error fetching challenge', error);
    }
  }
  async challengeLeaderBoard(challengeId:string){
    try {
      const challenge = await this.challengeModel.findById(challengeId);
      if (!challenge) {
        throw new NotFoundException('Challenge not found');
      }
      const userChallenges = await this.userChallengeModel
        .find({ challengeId })
        .populate('userId', 'name email')
        .sort({ progress: -1 })
        .exec();

      return {
        challenge: {
          id: challenge._id,
          name: challenge.name,
          type: challenge.type,
          goal: challenge.goal,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
        },
        leaderboard: userChallenges.map((uc) => ({
          userId: uc.userId['_id'],
          name: uc.userId['name'],
          email: uc.userId['email'],
          total: uc.total,
          completedAt: uc.completedAt ?? null,
        })),
      };
    } catch (error) {
      throw new HttpException('Error retreiving challenge leaderboard', error);
    }
  }



  async updateUserChallenge(updateUserChallengeMetrics: CreateHealthMetricDto) {
    const { userId, value } = updateUserChallengeMetrics;
    try {
      const existingUserChallenge = await this.userChallengeModel.findOne({ userId });
        if (!existingUserChallenge) {
          throw new NotFoundException('User challenge not found');
        }
        const existingChallenge = await this.challengeModel.findById(existingUserChallenge.challengeId);
        if (!existingChallenge) {
          throw new NotFoundException('Challenge not found');
        }
      if (existingChallenge.goalType === ChallengeType.DAILY &&
          existingChallenge.dailyGoal !== undefined &&
          existingChallenge.requiredDays !== undefined){
          const allMetrics = await this.healthMetricModel.find({
            userId,
            type: existingChallenge.type,
            date: { $gte: existingChallenge.startDate, $lte: existingChallenge.endDate }
          }).exec();
          const daysMap = new Map(); // key: YYYY-MM-DD, value: suma del día

          for (const metric of allMetrics) {
            const day = metric.date.toISOString().slice(0, 10);
            daysMap.set(day, (daysMap.get(day) || 0) + metric.value);
          }

          const daysReachedGoal = Array.from(daysMap.values())
            .filter((value) => value >= existingChallenge.dailyGoal!)
            .length;

          const progress = (daysReachedGoal / existingChallenge.requiredDays) * 100;

          const updateObj = {
            total: daysReachedGoal,
            progress: progress > 100 ? 100 : progress,
          };

          if (daysReachedGoal >= existingChallenge.requiredDays) {
            updateObj["completedAt"] = new Date();
          }

          return await this.userChallengeModel.findByIdAndUpdate( existingUserChallenge._id, updateObj, { new: true }).exec();
      } else {
        const newUserTotal = existingUserChallenge.total + value;
        let newUserProgress = (newUserTotal / existingChallenge.goal) * 100;
        const updateObj = {
          total: newUserTotal,
          progress: newUserProgress
        }
        if (newUserProgress >= 100) {
          newUserProgress = 100;
          updateObj["completedAt"] = new Date();
        }
        return await this.userChallengeModel.findByIdAndUpdate(existingUserChallenge._id, updateObj, { new: true }).exec();
      }
    } catch (error) {
      throw new HttpException('Error updating user challenge', error);
    }
  }
}
