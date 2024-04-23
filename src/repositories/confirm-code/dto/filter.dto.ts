import { IConfirmCode } from '@/modules/confirm-code/domain';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class FilterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  field: keyof IConfirmCode;

  @IsDefined()
  @IsNotEmpty()
  value: string | number;
}
