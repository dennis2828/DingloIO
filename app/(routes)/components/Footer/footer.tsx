import { Logo } from "@/components/logo"
import Link from "next/link"
import { Newsletter } from "./newsletter"
import { Copyright } from "lucide-react"

export const Footer = () =>{
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
                        <Link href={"/"} className="hover:text-softBlue font-medium">home</Link>
                        <Link href={"/"} className="hover:text-softBlue font-medium">dashboard</Link>
                        <Link href={"/"} className="hover:text-softBlue font-medium">documentation</Link>
                        <Link href={"/"} className="hover:text-softBlue font-medium">pricing</Link>
                    </div>
                    <Newsletter/>
                </div>
            </div>
        </footer>
    )
}