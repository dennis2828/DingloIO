"use client"

import { usePathname } from "next/navigation"
import { DocumentationSection } from "../types"
import { cn } from "@/lib/utils";
import Link from "next/link";

export const DocumentationType = ({documentation}:{documentation: DocumentationSection}) =>{
    const pathname = usePathname();

    let pathnameRoute = pathname.split("/")[2] || "docs";

    let path = documentation.path.split('/')[2] || "docs";
    
    return (
        <Link href={documentation.path} className={cn(pathnameRoute===path ? "text-softBlue font-semibold":"text-black dark:text-gray-300 font-medium hover:text-gray-500 dark:hover:text-white", "cursor-pointer duration-100")}>{documentation.title}</Link>
    )
}