import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CreateRespondentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  uuid?: UUID;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  surname?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string;
}
