"use client"

interface AgentNameProps{
    projectId: string;
    agentName: string;
}

export const AgentName = ({projectId, agentName}: AgentNameProps) =>{
    return (
        <div className="text-center font-light text-[1.2em]">{agentName}</div>
    )
}