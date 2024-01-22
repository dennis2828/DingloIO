"use client";

import { useSocket } from "@/hooks/useSocket";
import { Conversation } from "@prisma/client";
import { useEffect, useState } from "react";
import { Instance } from "./instance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface MessagesHeaderProps {
  projectId: string;
  allConversations: Conversation[];
  conversationId: string | undefined;
}

export const MessagesHeader = ({
  allConversations,
  projectId,
  conversationId,
}: MessagesHeaderProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const [selectedConv, setSelectedConv] = useState<Conversation | undefined>(
    undefined
  );

  const { data } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}/conversation`);

      return res.data as Conversation[];
    },
    initialData: allConversations,
  });

  const activeConnections = data.filter((conv) => conv.online);

  useEffect(() => {
    if (!socket) return;

    socket.on("DingloClient-NewConnection", (connectionId: string) => {
      queryClient.setQueryData(["connections"], (old: Conversation[]) => {
        const findConv = old.find((conv) => conv.connectionId === connectionId);
        if (!findConv)
          return [{ connectionId, projectId, online: true }, ...old];
        return old.map((conv) => {
          if (conv.connectionId === connectionId) {
            return { ...conv, online: true };
          }
          return conv;
        });
      });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    });

    socket.on("DingloClient-Disconnect", (connectionId: string) => {
      queryClient.setQueryData(["connections"], (old: Conversation[]) => {
          return old.map((conv) => {
            if (conv.connectionId === connectionId) {
              return { ...conv, online: false };
            }
            return conv;
          });
      });
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    });

    return () => {
      socket.off("DingloClient-NewConnection");
      socket.off("DingloClient-Disconnect");
    };
  }, [socket, data]);

  useEffect(() => {
    // change the selected conversation
    if (conversationId) {
      const targetConversation = data.find(
        (conv) => conv.connectionId === conversationId
      );

      setSelectedConv(targetConversation);
    }
  }, [conversationId]);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center sm:flex-row mb-4">
        <p className="font-bold text-[1.5em] whitespace-nowrap">
          Active connections &#40;{activeConnections.length}&#41;
        </p>
        <Link target="_blank" href={`/experimental`} className="font-medium text-softBlue hover:underline">No user to talk to? Explore in our experimental mode</Link>
      </div>
  

      <div className="flex flex-col items-start justify-center gap-4 mb-4">
        {data.map((conv, idx) => (
          <Instance
            key={idx}
            selectedConv={selectedConv}
            setSelectedConv={setSelectedConv}
            convInstance={conv}
          />
        ))}
      </div>
    </div>
  );
};
