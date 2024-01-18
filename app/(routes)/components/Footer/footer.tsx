import { Logo } from "@/components/logo"
import Link from "next/link"
import { Newsletter } from "./newsletter"
import { Copyright } from "lucide-react"
import { getAuthSession } from "@/lib/authOptions"
import db from "@/lib/db"
import { navbarLinks } from "@/constants/navbarLinks"

export const Footer = async () =>{
    const session = await getAuthSession();
    
    let user = undefined;
    if(session && session.user)
        user = await db.user.findUnique({
            where:{
                id:session.user?.id,
            },
            select:{
                newsletter: true,
            },
        });
    
    
    return (
        <footer>
            <div className="shadow-[0px_0px_2.5px_.9px_rgba(126,154,234)]"/>
            <div className="flex flex-col gap-5 md:flex-row justify-between py-10">
                <div className="flex flex-col items-center md:items-start">
                    <Logo/>
                    <p className="flex items-center gap-1 mt-3 text-sm"><Copyright className="w-4 h-4"/>Copyright 2023. All rights reserved.</p>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                    {navbarLinks.map((navLink, index) => (
                        <Link key={index} href={navLink.path} className="hover:text-softBlue font-medium">{navLink.label}</Link>
                        ))}
                    </div>
                    {!session || !session.user ? null:<Newsletter newsletter={user?.newsletter!}/>}
                </div>
            </div>
        </footer>
    )
}