import { ProjectManager } from "./components/project-manager";
import { ProjectStatistics } from "./components/project-statistics";
import { Header } from "../../../../components/header";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { InitSocket } from "./components/init-socket";
import { MessagesWrapper } from "./components/message-panel/messages-wrapper";
import { Container } from "@/components/container";
import { getAuthSession } from "@/lib/authOptions";
import { CheckInvitations } from "./components/check-invitations";

const DashboardProjectPage = async ({params, searchParams}:{params:{id: string}, searchParams:{conversation: string}}) =>{
    const session = await getAuthSession();
    
    const project = await db.project.findUnique({
        where:{
            id: params.id,
            userId: session!.user!.id,
        },
    }); 
    

    const user = await db.user.findUnique({
        where:{
            id: session?.user!.id,
        },
        select:{
            invitations: true,
        },
    });

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
            <CheckInvitations invitations={user?.invitations || []}/>
            <Header/>
            <div>
                <div className="mt-16">
                    <ProjectManager projectId={project.id}/>
                </div>
                <div className="mt-14">
                    <ProjectStatistics project={project} invitations={user?.invitations || []}/>
                </div>
            </div>
            <div className="mt-16">
                <MessagesWrapper project={project} conversationId={searchParams.conversation}/>
            </div>
        </Container>
    )
}

export default DashboardProjectPage;
