import { DocumentationTypes } from "../constants"
import { LeftSideItem } from "./left-side-item"
export const LeftSide = () =>{
    return (
        <div className="space-y-3">
            {DocumentationTypes.map((doc, idx)=>(
                <LeftSideItem key={idx} doc={doc}/>
            ))}
        </div>
    )
}