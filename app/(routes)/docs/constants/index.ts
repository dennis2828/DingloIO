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
      ],
    },
  ],
};

export const APIReference: DocumentationSection = {
  title: "API Reference",
  path: "/docs/api-reference",
  links: [
   
  ],
};

export const DocumentationTypes: Array<DocumentationSection> = [Documentation, APIReference];


//code example
export const packageSetup = `import DingloIO from "dinglo-io";

const dingloIO = new DingloIO();
dingloIO.initializeSocket("your_api_key");

export default dingloIO;
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
    mutationFn: async (newMessage: Omit<dingloMessage, "isNew" | "id" | "agentName" | "agentImage" | "automated" | "isAgent">) => {
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

      //revalidate data on the dashboard
      dingloIO.socket?.emit("invalidate-query");
    }
  });
`

export const respondMessage = `interface dingloMessage {
  id: string
  isAgent: boolean;
  message: string;
  messagedAt: string;
  isNew: boolean
  agentName?: string;
  agentImage?: string;
  automated?: boolean;
}

const newMessage: Omit<dingloMessage, "isNew" | "id" | "agentName" | "agentImage" | "automated" | "isAgent"> = {
  message: "Hello World !",
  messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

//only emits the message and is not saving it in the database
dingloIO.respond(newMessage);
`;

export const saveMessage = `interface dingloMessage {
  id: string
  isAgent: boolean;
  message: string;
  messagedAt: string;
  isNew: boolean
  agentName?: string;
  agentImage?: string;
  automated?: boolean;
}

const newMessage: Omit<dingloMessage, "isNew" | "id" | "agentName" | "agentImage" | "automated" | "isAgent"> = {
  message: "Hello World !",
  messagedAt: new Date(Date.now()).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

//only emits the message and is not saving it in the database
await dingloIO.save(newMessage);
dingloIO.respond(newMessage);
`;

export const events = `dingloIO.on("disable_project",(status)=>{
  setIsProjectActive(status.isActive);
});

dingloIO.on("invalidate_query",()=>{
  queryClient.invalidateQueries({queryKey:["getConversationMessages"]});
});

dingloIO.on("message_client",(msg: {
connectionId: string,
message: string,
isAgent: true,
agentName: string,
agentImage: string,
messagedAt: Date
})=>{
  setMessages(prev=>[...prev, msg]);
})

dingloIO.on("available_agent", (availableAgent:{
  agentName: string;
  agentImage: string;
  available: boolean;
})=>{

  queryClient.setQueryData(["getConversationMessages"],(old: dingloMessage[])=>{
    if(old && old.length>0)
      return old.map(prevMsg=>({
        ...prevMsg,
        agentName: prevMsg.agentName,
        agentImage: prevMsg.agentImage,
      }));
    return [];
  })
  setAgent(availableAgent);
});


dingloIO.on("typing", (typing) => {
  setIsTyping(typing.isTyping);
});

dingloIO.on("delete_message",(msgId)=>{
  queryClient.setQueryData(["getConversationMessages"],(old: dingloMessage[])=>{
    if(old && old.length>0)
      return old.filter(prevMsg=>prevMsg.id!==msgId);
    return [];
  })
});
`

export const onEvent = `dingloIO.on("message_client",(msg)=>{
  setMessages(prev=>[...prev, msg]);
});
`;

export const offEvent = `// removes the event
dinglo.off("message_client")
`;