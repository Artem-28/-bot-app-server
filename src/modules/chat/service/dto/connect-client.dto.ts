import { IsDefined, IsString } from 'class-validator';
import { AuthToken, RespondentToken } from '@/common/types';

export class ConnectClientDto {
  @IsDefined()
  @IsString()
  chatId: number;

  @IsDefined()
  @IsString()
  socketId: string;

  @IsDefined()
  token: AuthToken | RespondentToken;
}
