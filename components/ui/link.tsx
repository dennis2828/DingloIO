import { cn } from "@/lib/utils";
import Link from "next/link"
import { HTMLAttributes } from "react"

interface StyledLinkProps extends HTMLAttributes<HTMLLinkElement>{
    href: string;
}

export const StyledLink = ({children, className, href}: StyledLinkProps) =>{
    return (
        <Link href={href} className={cn("text-sm border-b border-softBlue hover:border-transparent hover:text-softBlue font-semibold", className)}>{children}</Link>
    )
}