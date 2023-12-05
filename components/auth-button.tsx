"use client"
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export const AuthButton = () =>{
    return (
        <Link prefetch role="button" href={"/account"} aria-label="Register an account" className={cn(buttonVariants({variant:"outline"}), "flex items-center group gap-1")}>Register an account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 duration-100"/></Link>
    )
}