"use client"
import { cn } from "@/lib/utils";
import { NavbarLink } from "@/types"
import Link from "next/link"
import { HTMLAttributes } from "react"

interface NavLinkProps extends HTMLAttributes<HTMLLinkElement> {
    navLink: NavbarLink;
}
export const NavLink = ({navLink, className}:NavLinkProps) =>{
    return (
        <Link prefetch href={navLink.path} className={cn("lowercase relative after:content-[''] after:absolute after:-bottom-[2px] after:left-[50%] after:translate-x-[-50%] after:h-[1.5px] after:bg-softBlue after:w-0 hover:after:w-full after:duration-150 hover:-translate-y-[2px] duration-150", className)}>{navLink.label}</Link>
    )
}