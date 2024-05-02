import {
  AccessController,
  PermissionCommonEnum,
} from '@/providers/permission/permission.type';

export const PROJECT_VIEW: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const PROJECT_REMOVE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const PROJECT_UPDATE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};
