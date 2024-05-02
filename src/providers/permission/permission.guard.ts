import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '@/providers/permission/permission.decorator';
import { CheckPermissionService } from '@/providers/permission/check-permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private readonly _checkPermissionService: CheckPermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const accessController = this._reflector.get(
      PERMISSION_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params || {};
    return await this._checkPermissionService.check(
      user.id,
      accessController,
      params,
    );
  }
}
