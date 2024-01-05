import db from "@/lib/db";
import { MessagesHeader } from "./messages-header";
import { Project } from "@prisma/client";
import { CreateMessage } from "./create-message";
import { Messages } from "./messages";
import { Separator } from "@/components/ui/separator";

interface MessagesWrapperProps {
  project: Project;
  conversationId: string | null;
}

export const MessagesWrapper = async ({
  project,
  conversationId,
}: MessagesWrapperProps) => {
  // conversation connections
  const allConversations = await db.conversation.findMany({
    where: {
      projectId: project.id,
    },
  });
  if (!conversationId || conversationId.trim() === "")
    return (
      <MessagesHeader
        conversationId={undefined}
        projectId={project.id}
        allConversations={allConversations}
      />
    );


  const predefinedAnswers = await db.predefinedAnswer.findMany({
    where: {
      projectId: project.id,
    },
  });

  const conversation = await db.conversation.findUnique({
    where: {
      connectionId: conversationId,
      projectId: project.id,
    },
    include: {
      messages: true,
    },
  });

  return (
    <div>
      <MessagesHeader
        conversationId={conversationId}
        projectId={project.id}
        allConversations={allConversations || []}
      />
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
              conversationId={conversation!.connectionId}
              messages={conversation!.messages || []}
            />
            <CreateMessage
              predefinedAnswers={predefinedAnswers || []}
              project={project}
              conversationId={conversation!.connectionId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
