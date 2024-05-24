import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UUID } from 'crypto';

class Respondent {
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

export class StartDto {
  @IsDefined()
  @IsNumber()
  scriptId: number;

  @IsOptional()
  respondent: Respondent;
}
