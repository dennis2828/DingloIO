"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { NewMessage } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface MessagesProps {
  projectId: string;
  chatId: string;
  messages: Array<NewMessage>;
  setMessages: Dispatch<SetStateAction<Array<NewMessage>>>;
}

export const Messages = ({ projectId, chatId, messages, setMessages }: MessagesProps) => {
  const { socket } = useSocket((state) => state);

  const [syncedMessages, setSyncedMessages] = useState(messages);

  const [agentMessage, setAgentMessage] = useState<string>("");
  const [placeholderMessage, setPlaceholderMessage] =
    useState<string>("Write your message");
  const [clientTyping, setClientTyping] = useState<boolean>(false);

  useEffect(() => {
    if (agentMessage && agentMessage !== "") {
      if (!socket) return;

      setTimeout(() => {
        //debounce
        socket.emit("DingloServer-Typing", { chatId, isTyping: true });
      }, 500);
    } else {
      if (!socket) return;
      setTimeout(() => {
        socket.emit("DingloServer-Typing", { chatId, isTyping: false });
      }, 500);
    }
  }, [agentMessage]);

  useEffect(() => {
    if (!socket) return;
    socket.off("DingloClient-Typing");

    socket.on("DingloClient-Typing", (typing) => {
      console.log("typing", typing, chatId);

      if (typing.connectionId === chatId) setClientTyping(typing.isTyping);
    });
  }, [socket, chatId]);

  useEffect(() => {
    setClientTyping(false);
  }, [chatId]);

    
  const {mutate: deleteMessage, isPending: isDeleting} = useMutation({
    mutationFn: async(messageId: string)=>{
      const res = await axios.delete(`/api/project/${projectId}/conversation/${chatId}/message/${messageId}`);

      return res.data;
    },
    onSuccess:(data, variables)=>{
      toast({toastType:"SUCCESS",title:"Message was successfully deleted"});
      
      if(!socket) return;
      socket.emit("DingloServer-DeleteMessage",{id: variables, connectionId: chatId});
    },
    onError:(err)=>{
      setSyncedMessages(messages);
      toast({toastType:"ERROR",title:"Message was not deleted"});
    },
    onMutate:(variables)=>{
      setSyncedMessages(prev=>{
        return prev.filter(msg=>msg.id!==variables);
      });
    }
  });

  const {mutate: createMessage, isPending: isCreating} = useMutation({
    mutationFn: async(newMessage:{id: string, message: string, messagedAt: string, isAgent: boolean})=>{
      const res = await axios.post(`/api/project/${projectId}/conversation/${chatId}/message`,newMessage);

      return res.data;
    },
    onSuccess:(data, variables)=>{
      toast({toastType:"SUCCESS",title:"Message was successfully created"});
      
      if(!socket) return;

      socket.emit("DingloServer-DashboardMessage", {
        id: variables.id,
        connectionId: chatId,
        message: variables.message,
        isAgent: variables.isAgent,
        messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    },
    onError:(err)=>{
      setSyncedMessages(messages);
      toast({toastType:"ERROR",title:"Message was not sent"});
    },
    onMutate:(variables)=>{

      setSyncedMessages(prev=>[...prev, {...variables, connectionId: chatId}])
    }
  });

  // synchronize messages
  useEffect(()=>{
    setSyncedMessages(messages);
  },[messages]);

  return (
    <div>
      <div className="space-y-6 max-h-[500px] overflow-y-scroll overflowContainer">
        {syncedMessages.map((msg, index) => (
          <div
            key={index}
            className={`${
              msg.isAgent
                ? "bg-softBlue ml-auto text-white duration-150 group cursor-pointer"
                : "bg-white mr-auto text-softBlue"
            } px-2 py-.5 max-w-full w-fit font-medium rounded-md`}
          >
            <p
              className={`text-sm ${
                msg.isAgent ? "text-gray-300" : "text-gray-400"
              } font-normal text-center`}
            >
              {msg.isAgent ? "admin" : "client"}
            </p>
            <p className={`${msg.isAgent ? "text-end" : "text-start"}`}>
              {msg.message}
            </p>
              <div className="opacity-0 group-hover:opacity-100 duration-150">
                <TrashIcon onClick={()=>deleteMessage(msg.id)} className="w-4 h-4 text-red-500"/>
              </div>
          </div>
        ))}
        {clientTyping ? (
          <div className="bg-white text-softBlue rounded-full w-fit text-xs p-1">
            user is typing...
          </div>
        ) : null}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-2 mb-1"
      >
        <Input
          value={agentMessage}
          onChange={(e) => {
            setAgentMessage(e.target.value);
          }}
          className="bg-transparent mb-1 border-lightBlue px-1"
          placeholder={placeholderMessage}
        />
        <div className="flex justify-start xsBig:justify-center">
          <Button isLoading={isCreating}
            onClick={() => {
              
              if (agentMessage && agentMessage.trim() !== "") {
                createMessage({id:uuidv4(), message: agentMessage, messagedAt:new Date(Date.now()).toLocaleTimeString("en-US",{ hour: "2-digit", minute: "2-digit" }), isAgent: true});
              } else {
                setPlaceholderMessage("Cannot sent empty messages");
              }
              setAgentMessage("");
            }}
            className="sm:w-[350px] font-bold sm:text-[1em] mt-1"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};
