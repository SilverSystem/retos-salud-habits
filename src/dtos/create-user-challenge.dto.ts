import { IsNotEmpty, IsString, IsMongoId } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserChallengeDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  challengeId: string;
}