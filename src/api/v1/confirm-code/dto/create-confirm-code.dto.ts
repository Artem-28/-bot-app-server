import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ConfirmCodeTypeEnum } from '@/modules/confirm-code/domain';

export class CreateConfirmCodeDto {
  @IsEnum(ConfirmCodeTypeEnum)
  type: ConfirmCodeTypeEnum;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  destination: string;
}
