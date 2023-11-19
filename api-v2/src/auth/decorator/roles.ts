/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Roles } from "./roles.enum";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);