"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { Message, Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface CreateMessagesProps {
  project: Project;
  conversationId: string;
}

export const CreateMessage = ({
  project,
  conversationId,
}: CreateMessagesProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const [agentMessage, setAgentMessage] = useState<string>("");
  const [placeholderMessage, setPlaceholderMessage] =
    useState<string>("Write your message");

  useEffect(() => {
    if (agentMessage && agentMessage !== "") {
      if (!socket) return;

      setTimeout(() => {
        //debounce
        socket.emit("DingloServer-Typing", {
          conversationId: conversationId,
          isTyping: true,
        });
      }, 500);
    } else {
      if (!socket) return;
      setTimeout(() => {
        socket.emit("DingloServer-Typing", {
          conversationId: conversationId,
          isTyping: false,
        });
      }, 500);
    }
  }, [agentMessage]);

  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: Omit<Message, "id">) => {
      const res = await axios.post(
        `/api/project/${project.id}/conversation/${conversationId}/message`,
        newMessage
      );

      return res.data;
    },
    onMutate: (variable) => {
      queryClient.setQueryData(["messages"], (old: Message[]) => [
        ...old,
        variable,
      ]);
      if (!socket) return;

      socket.emit("DingloServer-DashboardMessage", {
        connectionId: conversationId,
        message: variable.message,
        isAgent: variable.isAgent,
        agentName: project.agentName,
        agentImage: project.agentImage,
        messagedAt: variable.messagedAt,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast({
          toastType: "ERROR",
          title:
            error.response?.data ||
            "Something went wrong. Please try again later.",
        });
      else
        toast({
          toastType: "ERROR",
          title: "Something went wrong. Please try again later.",
        });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });

      if (!socket) return;

      socket?.emit("DingloServer-InvalidateQuery", {
        connectionId: conversationId,
      });
    },
  });

  return (
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
        <Button
          onClick={() => {
            if (agentMessage && agentMessage.trim() !== "") {
              createMessage({
                conversationId: conversationId,
                message: agentMessage,
                messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                createdAt: new Date(),
                isAgent: true,
                automated: false,
              });
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
  );
};
