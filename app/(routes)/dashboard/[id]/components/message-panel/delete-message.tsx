"use client"

import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { NewMessage } from "@/types";
import { Message } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TrashIcon } from "lucide-react"

interface DeleteMessageProps{
    projectId: string;
    conversationId: string;
    msg: Message
}

export const DeleteMessage = ({projectId, msg, conversationId}: DeleteMessageProps) =>{
    const {socket} = useSocket();

      const queryClient = useQueryClient();

    const {mutate: deleteMessage, isPending: isDeleting} = useMutation({
        mutationFn: async(messageId: string)=>{
          const res = await axios.delete(`/api/project/${projectId}/conversation/${conversationId}/message/${messageId}`);
    
          return res.data;
        },
        onSuccess:(data, variables)=>{
          toast({toastType:"SUCCESS",title:"Message was successfully deleted"});
          
          if(!socket) return;
          socket.emit("DingloServer-DeleteMessage",{id: variables, connectionId: conversationId});
        },
        onError:(err)=>{
          toast({toastType:"ERROR",title:"Message was not deleted"});
        },
        onMutate:(variable)=>{
         queryClient.setQueryData(["messages"],(old: Message[])=>{
          return old.filter(prevMsg=>prevMsg.id!==variable);
         });  
        },
        onSettled:()=>{
          queryClient.invalidateQueries({queryKey:["messages"]});
        }
      });

    return (
        <div className="opacity-0 group-hover:opacity-100 duration-150">
            <TrashIcon onClick={()=>deleteMessage(msg.id)} className="w-4 h-4 text-red-500"/>
        </div>
    )
}