import db from "@/lib/db"
import { MessagesContainer } from "./messages-container";

export const MessagesWrapper = async ({projectId}:{projectId: string}) =>{
    // all conversation connections
    const projectConversations = await db.conversation.findMany({
        where:{
            projectId,
        },
    });

    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Active connections &#40;{projectConversations.length}&#41;</p>
            <MessagesContainer projectId={projectId} connections={projectConversations}/>
        </div>
    )
}