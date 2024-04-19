import { IUser, UserAggregate } from '@/modules/user/domain';

export abstract class UserRepositoryDomain {
  abstract create(user: IUser): Promise<UserAggregate>;
}
