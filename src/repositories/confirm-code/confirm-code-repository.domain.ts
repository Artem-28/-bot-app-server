import {
  ConfirmCodeAggregate,
  IConfirmCode,
} from '@/modules/confirm-code/domain';

export abstract class ConfirmCodeRepositoryDomain {
  abstract create(confirmCode: IConfirmCode): Promise<ConfirmCodeAggregate>;
}
