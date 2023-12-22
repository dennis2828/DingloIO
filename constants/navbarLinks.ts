import { getAuthSession } from "@/lib/authOptions";
import db from "@/lib/db";
import { NavbarLink } from "@/types";


export const navbarLinks: Array<NavbarLink> = [
    {
        label:"home",
        path:"/",
    },
    {
        label:"dashboard",
        path:"/dashboard",
    },
    {
        label:"my account",
        path:"/account",
    },
    {
        label:"documentation",
        path:"/docs",
    },
];