import { ConversationWithMessages } from "@/types";
import { Project } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Messages } from "./messages";

interface MessagesContainerProps {
  project: Project;
  conversation: ConversationWithMessages;
}

export const MessagesContainer = ({
  project,
  conversation,
}: MessagesContainerProps) => {
  

  return (
    <div>
      <div>
        <Separator className="w-full h-[1.1px] bg-softBlue mb-6" />
        <div className="shadow-[0px_0px_10px_1px_rgb(67,117,224)] rounded-t-sm rounded-b-sm">
          <div className="flex justify-center bg-softBlue p-2 rounded-t-sm">
            <p className="font-bold text-center text-white">
              Realtime conversation
            </p>
          </div>
          <div className="bg-transparent dark:bg-[#0d0d0f] p-3 rounded-b-sm">
            <Messages
              project={project}
              conversationId={conversation.connectionId}
              messages={conversation.messages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
