import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateScriptDto {
  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsNumber()
  projectId: number;
}
