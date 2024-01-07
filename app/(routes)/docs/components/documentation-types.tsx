import { DocumentationTypes as DocumentationLinks } from "../constants"
import { DocumentationType } from "./documentation-type"

export const DocumentationTypes = () =>{

    return (
        <div>
            {DocumentationLinks.map((dc, idx)=>(
                <DocumentationType key={idx} documentation={dc}/>
            ))}
        </div>
    )
}