import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { InitSocket } from "./components/init-socket";
import { MessagesWrapper } from "./components/message-panel/messages-wrapper";
import { Container } from "@/components/container";
import { getAuthSession } from "@/lib/authOptions";

const DashboardProjectPage = async ({params, searchParams}:{params:{id: string}, searchParams:{conversation: string}}) =>{
    const session = await getAuthSession();
    
    const project = await db.project.findUnique({
        where:{
            id: params.id,
            userId: session!.user!.id,
        },
    }); 
    console.log(searchParams);
    
    if(!project)
        redirect("/create");

    if(searchParams.conversation && searchParams.conversation.trim()!==""){
        const targetConversation = await db.conversation.findUnique({
            where:{
                projectId: project.id,
                connectionId: searchParams.conversation,
            },
        });
        
        if(!targetConversation) redirect(`/dashboard/${project.id}`);
    }


    return (
        <Container>
            <InitSocket id={project.api_key}/>
            <Header/>
            <div>
                <div className="mt-16">
                    <ProjectManager projectId={project.id}/>
                </div>
                <div className="mt-14">
                    <ProjectStatistics project={project}/>
                </div>
            </div>
            <div className="mt-16">
                <MessagesWrapper project={project} conversationId={searchParams.conversation}/>
            </div>
        </Container>
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