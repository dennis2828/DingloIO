import { Messages } from "./messages"
import { ConversationWithMessages } from "@/types"
import { Conversation } from "@prisma/client"
import { Separator } from "@/components/ui/separator"

interface MessageControlProps{
    projectId: string;
    conversation: ConversationWithMessages;
    allConversations: Conversation[];
}

export const MessagesControl = ({projectId, conversation, allConversations}:MessageControlProps) =>{    

    return (
        <div>
            <Separator className="w-full h-[1.1px] bg-softBlue mb-6"/>
                <div className="shadow-[0px_0px_10px_1px_rgb(67,117,224)] rounded-t-sm rounded-b-sm">
                <div className="flex justify-center bg-softBlue p-2 rounded-t-sm">
                    <p className="font-bold text-center text-white">Realtime conversation</p>
                </div>
                <div className="bg-transparent dark:bg-[#0d0d0f] p-3 rounded-b-sm">
                    <Messages projectId={projectId} conversationId={conversation.connectionId} messages={conversation.messages}/>
                </div>
            </div>
        </div>
    )
}