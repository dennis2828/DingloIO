
import { ProjectSettings } from "./project-settings"
import { SelectProject } from "./select-project"

export const ProjectManager = () =>{
    return (
        <div className="flex items-center justify-between">
            <div className="max-w-fit">
                <SelectProject/>
            </div>
            <ProjectSettings/>
        </div>
    )
}