import { IUser } from '@/modules/user/domain';
import { UserAggregate } from '@/modules/user/domain/user.aggregate';

export abstract class UserRepositoryDomain {
  abstract create(user: IUser): Promise<UserAggregate>;
}
