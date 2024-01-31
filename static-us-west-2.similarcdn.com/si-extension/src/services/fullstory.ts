import * as FS from '@fullstory/browser';
import { User } from '../domain/user';
import { isProductionEnv } from './browser';

export const init = () => {
  if (!isProductionEnv()) return;

  const fsOrgId = 'ND4K8';
  FS.init({ orgId: fsOrgId, recordOnlyThisIFrame: true });
};

export const identify = (user: User) => {
  if (!FS.isInitialized()) return;

  FS.identify(`${user.userId}`, {
    email: user.email,
    productName: user.accountType,
    displayName: `${user.firstName} ${user.lastName}`,
  });
};
