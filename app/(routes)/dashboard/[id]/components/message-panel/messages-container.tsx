import { MessagesControl } from "./messages-control";
import { ConnectionsControl } from "./connections-control";
import { ConversationWithMessages } from "@/types";
import db from "@/lib/db";
import { MessagesHeader } from "./messages-header";
import { Project } from "@prisma/client";

interface MessagesContainerProps{
    project: Project;
    conversation: ConversationWithMessages;
}

export const MessagesContainer = async ({project, conversation}: MessagesContainerProps) =>{
    const allConversations = await db.conversation.findMany({
      where:{
          projectId: project.id,
      },
  });
  console.log(allConversations);
  

    return (
        <div>

            <MessagesControl project={project} conversation={conversation} allConversations={allConversations}/>
            {/* <div className="mt-16">
              <ConnectionsControl connections={connections} projectId={projectId}/>
            </div> */}
        </div>
    )
}