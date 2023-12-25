
import db from "@/lib/db"
import { ProjectSettings } from "./project-settings"
import { SelectProject } from "./select-project"
import { getAuthSession } from "@/lib/authOptions"

export const ProjectManager = async ({projectId}:{projectId: string}) =>{
    const session = await getAuthSession();

    const allProjects = await db.project.findMany({
        where:{
            userId:session!.user?.id,
        },
    });
    
    return (
        <div className="flex items-center justify-between">
            <div className="max-w-fit">
                <SelectProject projects={allProjects}/>
            </div>
            <ProjectSettings projectId={projectId}/>
        </div>
    )
}