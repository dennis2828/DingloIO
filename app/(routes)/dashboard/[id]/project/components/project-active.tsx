"use client"

import { revalidate } from "@/actions/revalidatePath"
import { Button } from "@/components/ui/button"
import { useSocket } from "@/hooks/useSocket"
import { Power } from "lucide-react"
import { useEffect, useState } from "react"

interface ProjectActiveProps{
    userId: string;
    disabled: boolean;
    projectId: string;
}
export const ProjectActive = ({userId, disabled, projectId}: ProjectActiveProps) =>{
    const {socket} = useSocket(state=>state);

    const [isDisabled, setIsDisabled] = useState<boolean>(disabled);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(()=>{
        if(!socket) return;

        
        socket.on("DingloClient-ProjectDisabled",(status)=>{
            setIsDisabled(!status.isDisabled);
            setIsLoading(false);
            revalidate(`/dashboard/${projectId}`);
        });

        return ()=>{
            socket.off("DingloClient-ProjectDisabled");
        }
    },[socket]);

    return (
        <Button isLoading={isLoading} disabled={isLoading} variant={isDisabled ? "default":"destructive"} onClick={()=>{
            
            if(!socket) return;
            setIsLoading(true);
            socket.emit("DingloServer-ProjectStatus",{userId, isDisabled});
            setIsLoading(false)
        }}>{isDisabled ? "Reboot":"Turn off project"} <Power className="ml-2 w-4 h-4 text-white"/></Button>
    )
}