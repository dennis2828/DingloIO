"use client"

import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { NewMessage } from "@/types";
import { Message } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TrashIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react";

interface DeleteMessageProps{
    projectId: string;
    conversationId: string;
    messages: Array<Message>;
    msg: Message
    setSyncedMessages: Dispatch<SetStateAction<Array<Message>>>;
}

export const DeleteMessage = ({projectId, msg, conversationId, messages, setSyncedMessages}: DeleteMessageProps) =>{
    const {socket} = useSocket();

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
          setSyncedMessages(messages);
        },
        onMutate:(variables)=>{
          setSyncedMessages(prev=>{
            return prev.filter(msg=>msg.id!==variables);
          });
        }
      });

    return (
        <div className="opacity-0 group-hover:opacity-100 duration-150">
            <TrashIcon onClick={()=>deleteMessage(msg.id)} className="w-4 h-4 text-red-500"/>
        </div>
    )
}