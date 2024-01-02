"use client"

import Image from "next/image";

interface AgentImageProps{
    agentImage: string;
    projectId: string;
}

export const AgentImage = ({agentImage, projectId}: AgentImageProps) =>{
    return (
        <div>
            <Image src={agentImage} width={180} height={180} className="w-[180px] h-[180px] rounded-full object-cover" alt="agent-image"/>
        </div>
    )
}