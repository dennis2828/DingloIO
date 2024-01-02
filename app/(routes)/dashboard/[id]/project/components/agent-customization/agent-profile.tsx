import { AgentImage } from "./agent-image"
import { AgentName } from "./agent-name"

interface AgentProfileProps{
    userId: string;
    projectId: string;
    agentImage: string;
    agentName: string;
}

export const AgentProfile = ({projectId, agentImage, agentName}: AgentProfileProps) =>{
    return (
        <div>
            <p className="font-bold text-[1.5em] mb-4">Change your profile appearance</p>
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-2">
                    <AgentImage agentImage={agentImage} projectId={projectId}/>
                    <AgentName projectId={projectId} agentName={agentName}/>
                </div>
            </div>
        </div>
    )
}