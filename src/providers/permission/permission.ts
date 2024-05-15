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

export const SCRIPT_CREATE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const SCRIPT_REMOVE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const SCRIPT_UPDATE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const SCRIPT_VIEW: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};

export const RESPONDENT_CREATE: AccessController = {
  permissions: [PermissionCommonEnum.ADMIN],
  operator: 'or',
};
