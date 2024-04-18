import { IUser } from '@/modules/auth/domain';
import { UserAggregate } from '@/modules/auth/domain/user.aggregate';

export abstract class UserRepositoryDomain {
  abstract create(user: IUser): Promise<UserAggregate>;
}
