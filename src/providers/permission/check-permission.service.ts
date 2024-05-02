import { ProjectRepository } from '@/repositories/project';
import { Injectable } from '@nestjs/common';
import {
  AccessController,
  AccessControllerEnum,
  PermissionCommonEnum,
} from '@/providers/permission/permission.type';
import { IProject, ProjectAggregate } from '@/modules/project/domain';
import { FilterDto } from '@/common/dto';

@Injectable()
export class CheckPermissionService {
  private _project: ProjectAggregate;
  private _userId: number;
  private _access: AccessController;

  constructor(private readonly _projectRepository: ProjectRepository) {}

  get operator() {
    return this._access.operator;
  }

  get permissions() {
    return this._access.permissions;
  }

  public async check(
    userId: number,
    accessController: AccessController,
    params: any,
  ) {
    this._access = accessController;
    this._userId = userId;

    await this._loadProject(params);
    if (!this._project) return false;

    switch (this.operator) {
      case 'and':
        return this.permissions.every((permission) =>
          this._checkPermission(permission, params),
        );
      case 'or':
        return this.permissions.some((permission) =>
          this._checkPermission(permission, params),
        );
      default:
        return false;
    }
  }

  private async _loadProject(params) {
    if (!params.projectId) return;

    const filters: FilterDto<IProject>[] = [];
    this.permissions.forEach((permission) => {
      switch (permission) {
        case PermissionCommonEnum.ADMIN:
          filters.push({ field: 'userId', value: this._userId });
          break;
        default:
          break;
      }
    });

    this._project = await this._projectRepository.getOne([
      { field: 'id', value: params.projectId },
      ...filters,
    ]);
  }

  private _checkPermission(permission: AccessControllerEnum, params: any) {
    switch (permission) {
      case PermissionCommonEnum.ADMIN:
        return this._checkProjectAdmin();
      default:
        return false;
    }
  }

  private _checkProjectAdmin(): boolean {
    return this._project && this._project.userId === this._userId;
  }
}
