import Link from "next/link"
import { DocumentationTypes as DocumentationLinks } from "../constants"
import { DocumentationMobileMenu } from "./documentation-mobile-menu"
import { DocumentationType } from "./documentation-type"
import { Github } from "lucide-react"

export const DocumentationTypes = () =>{

    return (
        <div className="border-b pb-1 flex items-center gap-2">
            <div className="lg:hidden">
                <DocumentationMobileMenu/>
            </div>
            <div className="flex justify-center gap-3 sm:justify-start">
                {DocumentationLinks.map((dc, idx)=>(
                    <DocumentationType key={idx} documentation={dc}/>
                ))}
            </div>
            <Link target="_blank" href={"https://github.com/dennisdingo28/DingloIO"} className="ml-auto hover:text-gray-400 duration-100"><Github className="w-5 h-5"/></Link>
        </div>
    )
}