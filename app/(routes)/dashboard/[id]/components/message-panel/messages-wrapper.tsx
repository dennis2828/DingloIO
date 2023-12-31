import db from "@/lib/db"
import { MessagesContainer } from "./messages-container";
import { MessagesHeader } from "./messages-header";


interface MessagesWrapperProps{
    projectId: string;
    conversationId: string | null;
}

export const MessagesWrapper = async ({projectId, conversationId}: MessagesWrapperProps) =>{
    // conversation connections
    const allConversations = await db.conversation.findMany({
        where:{
            projectId,
        },
    });
    if(!conversationId || conversationId.trim()==="")
        return (
            <MessagesHeader isConversationId={false} projectId={projectId} allConversations={allConversations}/>
        )

    const targetConversation = await db.conversation.findUnique({
        where:{
            connectionId: conversationId,
            projectId,
        },
        include:{
            messages: true,
        },
    });

   

    return (
        <div>
            <MessagesHeader isConversationId={true} projectId={projectId} allConversations={allConversations}/>
            <MessagesContainer projectId={projectId} conversation={targetConversation!}/>
        </div>
    )
}