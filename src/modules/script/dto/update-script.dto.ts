import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateScriptDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsNumber()
  projectId: number;

  @IsOptional()
  @IsString()
  title?: string;
}
