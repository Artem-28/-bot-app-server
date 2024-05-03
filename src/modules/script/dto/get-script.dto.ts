import { IsDefined, IsNumber } from 'class-validator';

export class GetScriptDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsNumber()
  projectId: number;
}
