import { IUser } from "../models/user.model";

export interface IAuthRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<IUser | null>;
}