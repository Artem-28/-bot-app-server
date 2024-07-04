import { IsDefined, IsNumber } from 'class-validator';

export class StartDataDto {
  @IsDefined()
  @IsNumber()
  scriptId: number;

  @IsDefined()
  @IsNumber()
  respondentId: number;
}
