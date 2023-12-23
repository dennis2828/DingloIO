import { AccountRequest } from "@/validators/account";
import { Project } from "@prisma/client";

export interface Feature {
    title: string;
    description: string;
    featureImage: string;
}

export interface NavbarLink {
    label: string;
    path: string;
}
export type Account = Omit<AccountRequest, "confirmPassword">;

export interface AuthTokenPayload {
    userId: string;
    username: string;
}

export type ClientProject = Omit<Project, "password">;