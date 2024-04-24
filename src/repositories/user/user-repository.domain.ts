import { IUser, UserAggregate } from '@/modules/user/domain';
import { FilterDto } from '@/common/dto';

export abstract class UserRepositoryDomain {
  abstract create(user: IUser): Promise<UserAggregate>;
  abstract update(id: number, data: Partial<IUser>): Promise<boolean>;
  abstract getOne(
    filter: FilterDto<IUser> | FilterDto<IUser>[],
  ): Promise<UserAggregate | null>;
}
