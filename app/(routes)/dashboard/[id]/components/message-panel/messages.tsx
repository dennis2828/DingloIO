"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSocket } from "@/hooks/useSocket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { DeleteMessage } from "./delete-message";
import { Message, PredefinedAnswer, Project } from "@prisma/client";

interface MessagesProps {
  project: Project;
  conversationId: string;
  messages: Array<Message>;
  predefinedAnswers: Array<PredefinedAnswer>;
}

export const Messages = ({
  project,
  conversationId,
  messages,
  predefinedAnswers,
}: MessagesProps) => {
  const { socket } = useSocket((state) => state);

  // const [syncedMessages, setSyncedMessages] = useState(messages);
  const [agentMessage, setAgentMessage] = useState<string>("");
  const [placeholderMessage, setPlaceholderMessage] = useState<string>("Write your message");
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
      // admin is joined in the same room for multiple client, update the current conversation
      if (msg.conversationId === conversationId)
      {
        queryClient.setQueryData(["messages"], (old: Message[])=>[
          ...old,
          msg,
        ]);
      }

      // check for possible automated message
      const possbileAnswer = predefinedAnswers.filter(
        (answ) => answ.question === msg.message
      );

      if (possbileAnswer && possbileAnswer.length>0) {
        createMessage({
          message: possbileAnswer[0].answer,
          messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          conversationId: conversationId,
          isAgent: true,
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


  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: Omit<Message, "id">) => {
      const res = await axios.post(
        `/api/project/${project.id}/conversation/${conversationId}/message`,
        newMessage
      );

      return res.data;
    },
    onMutate: (variable) => {
      queryClient.setQueryData(["messages"], (old: Message[])=>[...old, variable]);
      if(!socket) return;

      socket.emit("DingloServer-DashboardMessage", {
        connectionId: conversationId,
        message: variable.message,
        isAgent: variable.isAgent,
        agentName: project.agentName,
        agentImage: project.agentImage,
        messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    },
    onError: (error) => {
      console.log("CREATE",error);
      
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
    onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["messages"]});

      if(!socket) return;

      socket?.emit("DingloServer-InvalidateQuery",{connectionId: conversationId});
    }
  });


  return (
    <div>
      <div className="space-y-6 max-h-[500px] overflow-y-scroll overflowContainer">
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
            {/* <DeleteMessage
              projectId={project.id}
              conversationId={conversationId}
              messages={messages}
              msg={msg}
              setSyncedMessages={setSyncedMessages}
            /> */}
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
                  conversationId: conversationId,
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
