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

export interface NewMessage {
    id: string;
    connectionId: string;
    isAgent: boolean;
    message: string;
    messagedAt: string;
}

connectionId
: 
"SNWUWR9Gnf0Z-JOGFCw-0"
isAgent
: 
false
message
: 
"i am the first client"
messagedAt
: 
"07:55 PM"