import { IsDefined, IsString } from 'class-validator';

export class CreateScriptDto {
  @IsDefined()
  @IsString()
  title: string;
}
