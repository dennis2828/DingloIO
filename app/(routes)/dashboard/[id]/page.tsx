import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { Messages } from "./components/messages";
import { InitSocket } from "./components/init-socket";
import { MessagesContainer } from "./components/messages-container";

const DashboardProjectPage = async ({params}:{params:{id: string}}) =>{
    const project = await db.project.findUnique({
        where:{
            id: params.id,
        },
        select:{
            id:true,
            projectName:true,
            api_key:true,
            userId: true,
        },
    }); 

    if(!project)
        redirect("/project/create");


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
                <MessagesContainer/>
            </div>
            <InitSocket id={project.api_key}/>
        </div>
    )
}

export default DashboardProjectPage;

// export async function generateStaticParams(){
//     const projects: Project[] = await getAllProjects();
//     if(projects.length===0)
//         return [];

//     return projects.map(project=>(
//         {
//             id: project.id.toString(),
//         }
//     ));
// }

// async function getAllProjects(){
//     try{
//         const session = await getAuthSession();

//         const projects = await fetch("http://localhost:3000/api/project",{next:{revalidate:0}, method:"GET", headers:{
//             Authorization:`Bearer ${session?.user?.accessToken}`,
//         }});

//         const jsonProjects = await projects.json();
    
//         return jsonProjects.projects;
//     }catch(err){
//         return [];
//     }
// }