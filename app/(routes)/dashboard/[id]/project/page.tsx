import { AppWindow } from "lucide-react";
import { PageInfo } from "./components/page-info";
import { ProjectActive } from "./components/project-active";
import { ProjectName } from "./components/project-name";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authOptions";
import { ConnectionsControl } from "../components/message-panel/connections-control";
import { Message } from "@prisma/client";
import { AllMessages } from "./components/all-messages";
import { AgentProfile } from "./components/agent-customization/agent-profile";
import { AnswersContainer } from "./components/predefined-answers/answers-container";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const session = await getAuthSession();
  const targetProject = await db.project.findUnique({
    where: {
      id: params.id,
      userId: session!.user!.id,
    },
    select: {
      id: true,
      projectName: true,
      agentName: true,
      agentImage: true,
      api_key: true,
      disabled: true,
    },
  });

  if (!targetProject) redirect("/dashboard");

  // get all project's conversations
  const conversations = await db.conversation.findMany({
    where: {
      projectId: targetProject.id,
    },
  });

  const conversationsMessages: Array<Message> = [];

    for (const conversation of conversations) {
        try {
          const messagesForConversation = await db.message.findMany({
            where: {
              conversationId: conversation.connectionId,
            },
          });
    
          // Push the results into conversationsMessages array
          conversationsMessages.push(...messagesForConversation);
        } catch (error) {
          console.error(`Error fetching messages for connections`);
        }
    }


  return (
    <div>
      <div className="flex flex-col xsBig:flex-row items-center justify-between mt-16 mb-10">
        <PageInfo
          label="Manage your project"
          icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue" />}
        />
        <div className="flex flex-col xs:flex-row items-center justify-center mt-6 xsBig:mt-0 gap-4">
          <ProjectName project={targetProject} />
          <ProjectActive
            userId={session!.user!.id}
            projectId={targetProject.id}
            disabled={targetProject.disabled}
          />
        </div>
      </div>
      <div className="mt-20 flex items-start justify-between">
        <AgentProfile projectId={targetProject.id} userId={session?.user?.id!} agentName={targetProject.agentName} agentImage={targetProject.agentImage}/>
        <AnswersContainer projectId={targetProject.id}/>
      </div>
      <div className="mt-20 flex justify-between">
        <div>
          <ConnectionsControl connections={conversations} projectId={targetProject.id}/>
        </div>
        <div>
          <AllMessages messages={conversationsMessages}/>
        </div>
      </div>
      
    </div>
  );
};

export default ProjectPage;