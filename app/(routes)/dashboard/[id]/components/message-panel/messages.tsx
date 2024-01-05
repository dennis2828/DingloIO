"use client";
import { useSocket } from "@/hooks/useSocket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DeleteMessage } from "./delete-message";
import { Message, Project } from "@prisma/client";
import { revalidate } from "@/actions/revalidatePath";
import { revalidatePath } from "next/cache";

interface MessagesProps {
  project: Project;
  conversationId: string;
  messages: Array<Message>;
}

export const Messages = ({
  project,
  conversationId,
  messages,
}: MessagesProps) => {
  const { socket } = useSocket((state) => state);
  const containerRef = useRef(null);

  const [clientTyping, setClientTyping] = useState<boolean>(false);
  
  const queryClient = useQueryClient();
  
  const {data, isPending} = useQuery({
    queryKey:["messages"],
    queryFn: async()=>{
      const res = await axios.get(`/api/project/${project.id}/conversation/${conversationId}/message`);

      return res.data as Message[];
    },
    initialData: messages,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("DingloClient-DashboardMessage", (msg) => {
      // admin is joined in the same room for multiple client, update the current conversation
      if (msg.conversationId === conversationId)
      {
        queryClient.setQueryData(["messages"], (old: Message[])=>{
          if(old && old.length>0) return [...old, msg];
          return [msg];
        });
      }
    });

    socket.on("DingloClient-Typing", (typing) => {
      if (typing.connectionId === conversationId)
        setClientTyping(typing.isTyping);
      else setClientTyping(false);
    });

    return () => {
      socket.off("DingloClient-DashboardMessage");
      socket.off("DingloClient-Typing");
    };
  }, [socket, conversationId]);

  useEffect(()=>{
    if (containerRef.current) {
      //@ts-ignore
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },[data, clientTyping]);

  return (
    <div ref={containerRef} className="space-y-6 max-h-[500px] overflow-y-scroll overflowContainer">
        {data.map((msg, index) => (
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
            <DeleteMessage
              projectId={project.id}
              conversationId={conversationId}
              msg={msg}
            />
          </div>
        ))}
        {clientTyping ? (
          <div className="bg-white text-softBlue rounded-full w-fit text-xs p-1">
            user is typing...
          </div>
        ) : null}
    </div>
  );
};
