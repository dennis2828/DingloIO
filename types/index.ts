import { AccountRequest } from "@/validators/account";

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