export type TUser = "User" | "Admin" | "Super Admin";

export interface IMasterUserRole {
  id: string;
  name: TUser;
}

export interface IUser {
  id?: string;
  username?: string;
  nomor?: string;
  active?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  masterUserRoleId?: string;
  MasterUserRole?: IMasterUserRole;
  termsOfServiceAccepted?: boolean;
}
