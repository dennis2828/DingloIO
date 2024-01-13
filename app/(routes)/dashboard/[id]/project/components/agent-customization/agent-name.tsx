"use client"

import { revalidate } from "@/actions/revalidatePath";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { useClickOutside } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface AgentNameProps{
    projectId: string;
    agentName: string;
}

export const AgentName = ({projectId, agentName}: AgentNameProps) =>{
    const {socket} = useSocket();
    const editForm = useClickOutside(()=>{
        if(agentName!==currentAgentName)
            updateProject(currentAgentName);
        setIsEditing(false);
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentAgentName, setCurrentAgentName] = useState<string>(agentName);


    const {mutate: updateProject, isPending} = useMutation({
        mutationFn: async(agentName: string)=>{
            const res = await axios.patch(`/api/project/${projectId}`,{agentName});
    
            return res;
        },
        onSuccess:()=>{
            socket?.emit("DingloServer-AgentChange");
            //{toastType:"SUCCESS", title:"Profile name was successfully updated!"})
        },
        onError:()=>{
            //{toastType:"ERROR", title:"Something went wrong while updating. Please try again later."})
        },
        onSettled:()=>{
            revalidate(`/dashboard/${projectId}/project`);
            setIsEditing(false);
        }
      });

    if(isEditing)
      return (
        <form ref={editForm} onSubmit={(e)=>{
            e.preventDefault();

            if(agentName!==currentAgentName)
                updateProject(currentAgentName);
            else setIsEditing(false);
        }}>
            <Input className="bg-transparent p-2" autoFocus value={currentAgentName} onChange={(e)=>setCurrentAgentName(e.target.value)}/>
        </form> 
        )

    return (
        <div className="text-center font-light text-[1.2em]" onClick={()=>setIsEditing(true)}>{currentAgentName}</div>
    )
}