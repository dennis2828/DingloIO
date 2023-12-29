import { AppWindow } from "lucide-react";
import { PageInfo } from "./components/page-info";
import { ProjectActive } from "./components/project-active";
import { ProjectName } from "./components/project-name";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/authOptions";
import { ConnectionsControl } from "../components/connections-control";
import { Message } from "@prisma/client";
import { AllMessages } from "./components/all-messages";

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
  const connections = conversations.map((conv) => {
    return {
      connectionId: conv.connectionId,
      online: conv.online,
    };
  });

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
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <PageInfo
          label="Manage your project"
          icon={<AppWindow className="w-5 h-5 text-white dark:text-softBlue" />}
        />
        <div className="flex flex-col xsBig:flex-row xsBig:items-center justify-center mt-10 md:mt-0 gap-4">
          <ProjectName project={targetProject} />
          <ProjectActive
            userId={session!.user!.id}
            projectId={targetProject.id}
            disabled={targetProject.disabled}
          />
        </div>
      </div>
      <div>
        <AllMessages messages={conversationsMessages}/>
      </div>
      <div className="mt-20">
        <ConnectionsControl connections={connections} projectId={targetProject.id}/>
      </div>
    </div>
  );
};

export default ProjectPage;
