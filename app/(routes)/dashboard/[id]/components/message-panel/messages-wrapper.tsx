import db from "@/lib/db"
import { MessagesContainer } from "./messages-container";
import { MessagesHeader } from "./messages-header";
import { Project } from "@prisma/client";


interface MessagesWrapperProps{
    project: Project;
    conversationId: string | null;
}

export const MessagesWrapper = async ({project, conversationId}: MessagesWrapperProps) =>{
    // conversation connections
    console.log("mw", conversationId);
    
    const allConversations = await db.conversation.findMany({
        where:{
            projectId: project.id,
        },
    });
    if(!conversationId || conversationId.trim()==="")
        return (
            <MessagesHeader conversationId={undefined} projectId={project.id} allConversations={allConversations}/>
        )

    const targetConversation = await db.conversation.findUnique({
        where:{
            connectionId: conversationId,
            projectId: project.id,
        },
        include:{
            messages: true,
        },
    });

    


    return (
        <div>
            <MessagesHeader conversationId={conversationId} projectId={project.id} allConversations={allConversations || []}/>
            <MessagesContainer project={project} conversation={targetConversation!}/>
        </div>
    )
}