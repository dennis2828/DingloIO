import db from "@/lib/db"
import { MessagesContainer } from "./messages-container";


interface MessagesWrapperProps{
    projectId: string;
    conversationId: string | null;
}

export const MessagesWrapper = async ({projectId, conversationId}: MessagesWrapperProps) =>{
    // conversation connections
    
    if(!conversationId || conversationId.trim()==="")
        return (
            <div>
                <p className="font-bold text-[1.5em] mb-4">Active connections &#40;0&#41;</p>
            </div>
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
            <MessagesContainer projectId={projectId} conversation={targetConversation!}/>
        </div>
    )
}