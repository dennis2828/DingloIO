"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DeleteMessage } from "./delete-message";
import { Message } from "@prisma/client";
import { revalidate } from "@/actions/revalidatePath";

interface MessagesProps {
  projectId: string;
  conversationId: string;
  messages: Array<Message>;
}

export const Messages = ({
  projectId,
  conversationId,
  messages,
}: MessagesProps) => {
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

  useEffect(() => {
    if (!socket) return;

    socket.on("DingloClient-DashboardMessage", (msg) => {
      console.log("new message rt", msg);

      // admin is joined in the same room for multiple client, update the current conversation
      if (msg.conversationId === conversationId)
        setSyncedMessages((prev) => [...prev, msg]);
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

  useEffect(() => {
    revalidate(`/dashboard/${projectId}`);
    setClientTyping(false);
    revalidate(`/dashboard/${projectId}`);
  }, [conversationId, projectId]);

  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: {
      id: string;
      message: string;
      messagedAt: string;
      isAgent: boolean;
    }) => {
      const res = await axios.post(
        `/api/project/${projectId}/conversation/${conversationId}/message`,
        newMessage
      );

      return res.data;
    },
    onSuccess: (data, variables) => {
      if (!socket) return;

      socket.emit("DingloServer-DashboardMessage", {
        id: variables.id,
        connectionId: conversationId,
        message: variables.message,
        isAgent: variables.isAgent,
        messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    },
    onError: (error) => {
      setSyncedMessages(messages);
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
    onMutate: (variables) => {
      setSyncedMessages((prev) => [
        ...prev,
        { ...variables, conversationId: conversationId },
      ]);
    },
  });

  // synchronize messages
  useEffect(() => {
    setSyncedMessages(messages);
  }, [messages]);

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
            <DeleteMessage
              projectId={projectId}
              conversationId={conversationId}
              messages={messages}
              msg={msg}
              setSyncedMessages={setSyncedMessages}
            />
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
          <Button
            onClick={() => {
              if (agentMessage && agentMessage.trim() !== "") {
                createMessage({
                  id: uuidv4(),
                  message: agentMessage,
                  messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  isAgent: true,
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
    </div>
  );
};
