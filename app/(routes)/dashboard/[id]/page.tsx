import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";
import { Project } from "@prisma/client";
import db from "@/lib/db";
import { redirect } from "next/navigation";

const DashboardProjectPage = async ({params}:{params:{id: string}}) =>{
    const project = await db.project.findUnique({
        where:{
            id: params.id,
        },
    }); 

    if(!project) redirect("/");
    

    return (
        <div>
            <Header/>
            <div>
                <div className="mt-16">
                    <ProjectManager/>
                </div>
                <div className="mt-14">
                    <ProjectStatistics project={project}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardProjectPage;

export async function generateStaticParams(){
    const projects: Project[] = await getAllProjects();

    return projects.map(project=>(
        {
            id: project.id,
        }
    ));
}

async function getAllProjects(){
    try{
        const projects = await fetch("/api/project",{next:{revalidate:0}});

        const jsonProjects = await projects.json();
    
        return jsonProjects.projects;
    }catch(err){
        return [];
    }
}