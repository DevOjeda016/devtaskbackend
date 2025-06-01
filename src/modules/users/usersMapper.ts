import { Types } from "mongoose";
import { IUser, IUserResponse } from "./userTypes";


export function toUserResponse(user: IUser): IUserResponse {
  return {
    id: user._id.toString(),
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    role: user.role,
    projects: user.projects,
  };
}
