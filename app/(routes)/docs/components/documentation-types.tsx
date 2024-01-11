import { DocumentationTypes as DocumentationLinks } from "../constants"
import { DocumentationMobileMenu } from "./documentation-mobile-menu"
import { DocumentationType } from "./documentation-type"

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
        </div>
    )
}