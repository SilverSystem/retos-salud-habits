import { IsNotEmpty, IsString } from "class-validator";


export class CreateUserChallengeDto{
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  challengeId: string;
}