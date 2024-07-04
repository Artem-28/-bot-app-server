import { IsOptional, IsString } from 'class-validator';

export class UpdateScriptDto {
  @IsOptional()
  @IsString()
  title?: string;
}
