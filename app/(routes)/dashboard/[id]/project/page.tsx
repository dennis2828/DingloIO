import { AppWindow } from "lucide-react";
import { PageInfo } from "./components/page-info";
import { ProjectActive } from "./components/project-active";
import { ProjectName } from "./components/project-name";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const ProjectPage = async ({params}:{params:{id: string}}) =>{
    const targetProject = await db.project.findUnique({
        where:{
            id: params.id,
        },
        select:{
            id: true,
            projectName: true,
        },
    });
    if(!targetProject)
        redirect("/dashboard");

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <PageInfo label="Manage your project" icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue"/>}/>
                <div className="flex flex-col xsBig:flex-row xsBig:items-center justify-center mt-10 md:mt-0 gap-4">
                    <ProjectName project={targetProject}/>
                    <ProjectActive/>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage;