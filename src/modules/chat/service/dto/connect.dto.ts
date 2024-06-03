import { IsDefined, IsString } from 'class-validator';
import { RespondentToken } from '@/common/types';

export class ConnectRespondentDto {
  @IsDefined()
  @IsString()
  chatId: number;

  @IsDefined()
  @IsString()
  socketId: string;

  @IsDefined()
  token: RespondentToken;
}
