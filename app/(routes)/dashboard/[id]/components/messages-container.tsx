import db from "@/lib/db"
import { MessagesControl } from "./messages-control"
import { Message } from "@prisma/client";
import { ConnectionsControl } from "./connections-control";


export const MessagesContainer = async ({projectId}:{projectId: string}) =>{
    // all conversation connections
    const projectConversations = await db.conversation.findMany({
        where:{
            projectId,
        },
    });
    const connectionsId = projectConversations.map(conv=>conv.connectionId);

    //all conversations messages
    const conversationsMessages: Array<Message> = [];

    for (const connectionId of connectionsId) {
        try {
          const messagesForConnection = await db.message.findMany({
            where: {
              conversationId: connectionId,
            },
          });
    
          // Push the results into conversationsMessages array
          conversationsMessages.push(...messagesForConnection);
        } catch (error) {
          console.error(`Error fetching messages for connection ${connectionId}:`, error);
        }
    }

    
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Active connections &#40;{projectConversations.length}&#41;</p>
            
            <MessagesControl connections={connectionsId} conversationsMessages={conversationsMessages}/>
            <div className="mt-16">
              <ConnectionsControl connections={connectionsId} projectId={projectId}/>
            </div>
        </div>
    )
}