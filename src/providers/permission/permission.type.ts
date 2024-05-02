export enum PermissionCommonEnum {
  ADMIN = 'admin',
}

export type AccessControllerEnum = PermissionCommonEnum;
export interface AccessController {
  permissions: AccessControllerEnum[];
  operator: 'and' | 'or';
}
