import { DocumentationSection } from "../types";

export const DocumentationLayout = {};

export const Documentation: DocumentationSection = {
  title: "Documentation",
  path: "/docs",
  links: [
    {
      title: "Getting started",
      links: [
        { title: "Introduction", link: "/docs" },
        { title: "Quickstart", link: "/docs/quickstart" },
      ],
    },
    {
      title: "Dashboard",
      links: [
        { title: "Interface", link: "/docs/interface" },
        { title: "Agent customization", link: "/docs/agent-customization" },
      ],
    },
    {
      title: "Chat Widget",
      links: [
        { title: "Workflow", link: "/docs/workflow" },
        { title: "Customization", link: "/docs/customization" },
      ],
    },
  ],
};

export const APIReference: DocumentationSection = {
  title: "API Reference",
  path: "docs/api-reference",
  links: [
    {
      title: "Initialization",
      links: [
        { title: "Install package", link: "docs/api-reference" },
      ],
    },
    {
      title: "Commands",
      links: [{title: "dingloIO.respond()", link: "docs/api-reference/commands"},{title: "dingloIO.save()", link: "docs/api-reference/commands"},{title: "other", link: "docs/api-reference/commands"}],
    },
  ],
};

export const DocumentationTypes: Array<DocumentationSection> = [Documentation, APIReference];


//code example
export const packageSetup = `import DingloIO from "dinglo-io";

const dingloIO = new DingloIO();
dingloIO.initializeSocket("your_api_key");

export {dingloIO};
`;

export const codeExample = `import dingloIO, {dingloMessage} from "dinglo-io"
import {useState, useEffect} from "react";

interface MessagesProps{
  initialMessages: Array<dingloMessage>;
}

const Messages = ({initialMessages}: MessagesProps) =>{
  const [messages, setMessages] = useState(initialMessages);
  // this is a sample example, use react query for better approach using invalidateQueries

  useEffect(()=>{
    dingloIO.on("message_client",(msg: dingloMessage)){
      setMessages(prev=>[...initialMessages, msg]);
    }

    return () =>{
      //clean the event
      dingloIO.off("message_client");
    }
  },[dinglo.socket]);

  return (
    <div>
      {messages.map((msg, idx)=>(
        <Message key={idx} message={msg}/>
      ))}
    </div>
  )
  /*
  interface dingloMessage {
    id: string
    isAgent: boolean;
    message: string;
    messagedAt: string;
    isNew: boolean
    agentName?: string;
    agentImage?: string;
    automated?: boolean;
  }
  */
}
`;

export const createMessage = `import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dingloIO, {dingloMessage} from "@/dinglo-io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CreateMessage = () => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>("");

  const { mutate: createMessage, isPending: isCreating } = useMutation({
    mutationFn: async (newMessage: Omit<dingloMessage, "isNew" | "id">) => {
      //save message in our database to be seen in dashboard
      const data = await dingloIO.save(newMessage);

      return data;
    },
    onMutate: (variables) => {
      dingloIO.respond({
        message: variables.message,
        isAgent: variables.isAgent,
        messagedAt: variables.messagedAt,
      });
      queryClient.setQueryData(["fetchedMessages"], (old: dingloMessage[])=>[
        ...old,
        variables,
      ]);
    },
    onSettled:()=>{
      queryClient.invalidateQueries({queryKey:["fetchedMessages"]});

      //emit the message to our dashboard
      dingloIO.socket?.emit("invalidate-query");
    }
  });
`