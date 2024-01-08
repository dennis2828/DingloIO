import { DocumentationTypes as DocumentationLinks } from "../constants"
import { DocumentationType } from "./documentation-type"

export const DocumentationTypes = () =>{

    return (
        <div className="border-b pb-1">
            <div className="flex gap-3">
                {DocumentationLinks.map((dc, idx)=>(
                    <DocumentationType key={idx} documentation={dc}/>
                ))}
            </div>
        </div>
    )
}