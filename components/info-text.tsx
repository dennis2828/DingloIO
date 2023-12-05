import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react"

interface InfoTextProps extends HTMLAttributes<HTMLSpanElement>{
    children: React.ReactNode;
}

export const InfoText = ({children, className}: InfoTextProps) =>{
    return (
        <span className={cn("text-softBlue", className)}>{children}</span>
    )
}