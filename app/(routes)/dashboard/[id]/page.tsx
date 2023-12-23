import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";
import { Project } from "@prisma/client";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authOptions";
import { Messages } from "./components/message";

const DashboardProjectPage = async ({params}:{params:{id: string}}) =>{
    const project = await db.project.findUnique({
        where:{
            id: params.id,
        },
    }); 

    if(!project)
        redirect("/project/create")


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
            <div className="mt-16">
                <Messages/>
            </div>
        </div>
    )
}

export default DashboardProjectPage;

export async function generateStaticParams(){
    const projects: Project[] = await getAllProjects();
    if(projects.length===0)
        return [];

    return projects.map(project=>(
        {
            id: project.id.toString(),
        }
    ));
}

async function getAllProjects(){
    try{
        const session = await getAuthSession();

        const projects = await fetch("http://localhost:3000/api/project",{next:{revalidate:0}, method:"GET", headers:{
            Authorization:`Bearer ${session?.user?.accessToken}`,
        }});

        const jsonProjects = await projects.json();
    
        return jsonProjects.projects;
    }catch(err){
        return [];
    }
}