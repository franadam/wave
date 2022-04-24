import { RolesBuilder } from 'nest-access-control';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRole.USER) // define new or modify existing role. also takes an array.
  .readOwn('profile')
  .grant(UserRole.ADMIN) // switch to another role without breaking the chain
  .extend(UserRole.USER)
  .createAny('profile') // inherit role capabilities. also takes an array
  .updateAny('profile') // explicitly defined attributes
  .deleteAny('profile');
