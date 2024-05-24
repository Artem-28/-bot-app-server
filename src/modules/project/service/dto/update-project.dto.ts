import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;
}
