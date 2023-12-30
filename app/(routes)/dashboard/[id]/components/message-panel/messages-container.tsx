import db from "@/lib/db";
import { Conversation } from "@prisma/client";
import { Message } from "@prisma/client";
import { MessagesControl } from "./messages-control";
import { ConnectionsControl } from "./connections-control";

interface MessagesContainerProps{
    projectId: string;
    connections: Array<Conversation>;
}

export const MessagesContainer = async ({projectId, connections}: MessagesContainerProps) =>{
    //all conversations messages
    const conversationsMessages: Array<Message> = [];

    for (const connection of connections) {
        try {
          const messagesForConnection = await db.message.findMany({
            where: {
              conversationId: connection.connectionId,
            },
          });
    
          // Push the results into conversationsMessages array
          conversationsMessages.push(...messagesForConnection);
        } catch (error) {
          console.error(`Error fetching messages for connections`);
        }
    }
    return (
        <div>
            <MessagesControl projectId={projectId} connections={connections} conversationsMessages={conversationsMessages}/>
            <div className="mt-16">
              <ConnectionsControl connections={connections} projectId={projectId}/>
            </div>
        </div>
    )
}