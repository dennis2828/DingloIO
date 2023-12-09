import {DefaultSession} from "next-auth";
import { ProjectProps } from "./types";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth"{
    interface User {
        id: string;
        name: string;
        accessToken: string;
    }
    interface Session extends DefaultSession {
        user?: User;
    }
}