"use client";

import { revalidate } from "@/actions/revalidatePath";
import { useSocket } from "@/hooks/useSocket";
import { Conversation } from "@prisma/client";
import { useEffect, useState } from "react";
import { Instance } from "./instance";

interface MessagesHeaderProps {
  projectId: string;
  allConversations: Conversation[];
  isConversationId: boolean;
}

export const MessagesHeader = ({
  allConversations,
  projectId,
  isConversationId
}: MessagesHeaderProps) => {
  const { socket } = useSocket();

  const [selectedConv, setSelectedConv] = useState<Conversation | undefined>(isConversationId ? allConversations[0] : undefined);
  const [currentConversations, setCurrentConversations] =
    useState<Array<Conversation>>(allConversations);

  const activeConnections = currentConversations.filter((conv) => conv.online);

  useEffect(() => {
    if (!socket) return;

    socket.on("DingloClient-NewConnection", (connectionId: string) => {
      setCurrentConversations((prev) => {
        const findConv = prev.find(
          (conv) => conv.connectionId === connectionId
        );
        if (!findConv)
          return [{ connectionId, projectId, online: true }, ...prev];
        else {
          return prev.map((conv) => {
            if (conv.connectionId === connectionId) {
              return { ...conv, online: true };
            }
            return conv;
          });
        }
      });
      revalidate(`/dashboard/${projectId}`);
    });

    socket.on("DingloClient-Disconnect", (connectionId: string) => {
      setCurrentConversations((prev) => {
        return prev.map((conv) => {
          if (conv.connectionId === connectionId) {
            return {
              ...conv,
              online: false,
            };
          }
          return conv;
        });
      });
    });

    return () => {
      socket.off("DingloClient-NewConnection");
      socket.off("DingloClient-Disconnect");
    };
  }, [socket, allConversations, currentConversations]);

  useEffect(() => {
    setCurrentConversations(allConversations);
  }, [allConversations]);

  return (
    <div>
      <p className="font-bold text-[1.5em] mb-4">
        Active connections &#40;{activeConnections.length}&#41;
      </p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        {currentConversations.map((conv, idx) => (
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
