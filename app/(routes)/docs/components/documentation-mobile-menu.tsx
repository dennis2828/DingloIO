"use client"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DocumentationTypes } from "../constants"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export const DocumentationMobileMenu = () => {
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();

    useEffect(()=>{
      setIsActive(false);
    },[pathname]);
  return (
    <Sheet open={isActive} onOpenChange={(open)=>setIsActive(open)}>
      <SheetTrigger asChild>
      <div className="lg:hidden">
            <div className="cursor-pointer" role="button" onClick={()=>setIsActive(!isActive)}>
                <div className={`w-[20px] line line1 h-[2px] bg-softBlue dark:bg-white ${isActive ? "active":null}`}/>
                <div className={`w-[20px] line line2 h-[2px] bg-softBlue dark:bg-white mt-1.5 ${isActive ? "active":null}`}/>
            </div>
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex lg:hidden flex-col gap-10 bg-[#0b0b0d]">
        {DocumentationTypes.map((doc, idx)=>(
            <div key={idx}>
                <p className="font-bold text-[1.2em]">{doc.title}</p>
                <div className="mt-4 space-y-6">
                    {doc.links.map((subLink, idx)=>(
                        <div>
                            <p className="font-bold">{subLink.title}</p>
                            <div className="mt-2 flex flex-col gap-4">
                                {subLink.links.map((child,idx)=>(
                                    <Link key={idx} href={child.link} className={`${pathname===child.link ? "text-softBlue":null} cursor-pointer hover:text-softBlue duration-100`}>{child.title}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
        <SheetFooter>
          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
