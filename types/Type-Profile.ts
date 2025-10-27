import { IUser } from "./User";

export interface IProfile {
  id?: string;
  name?: string;
  email?: string;
  alamat?: string;
  jenisKelamin?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  imageId?: string | null;
  imageBackgroundId?: string | null;
  User: IUser
}