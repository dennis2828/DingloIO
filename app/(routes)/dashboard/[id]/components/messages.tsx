"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { prefix } from "@/constants/literals";
import { useSocket } from "@/hooks/useSocket";
import { NewMessage } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

interface MessagesProps {
    chatId: string;
    messages: Array<NewMessage>;
    setMessages: Dispatch<SetStateAction<Array<NewMessage>>>;
}

export const Messages = ({chatId, messages, setMessages}: MessagesProps) =>{
    const {socket} = useSocket(state=>state);
    console.log(messages);
    
    const [agentMessage, setAgentMessage] = useState<string>("");

    return (
        <div>
            <p>active: {chatId}</p>
            <div>
                {messages.map((msg, index)=>(
                    <p key={index} className={`${msg.isAgent ? "text-end":"text-start"}`}>{msg.message}</p>
                ))}
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                
            }} className="mt-2 mb-1">
                <Input value={agentMessage} onChange={(e)=>setAgentMessage(e.target.value)} className="bg-transparent mb-1 border-lightBlue px-1" placeholder="Write your message"/>
                <Button type="submit" onClick={()=>{
                    if(!socket) return;

                    socket.emit("DingloServer-DashboardMessage",{...messages[0], message:agentMessage, isAgent: true})
                    const isConversation = localStorage.getItem(`${prefix}${chatId}`);
                    if(!isConversation || isConversation.trim()==="" || isConversation==="undefined") return;

                    const updatedConversations: Array<NewMessage> = JSON.parse(isConversation);
                    updatedConversations.push({...messages[0], message:agentMessage, isAgent: true});
                    setMessages(updatedConversations);
                    localStorage.setItem(`${prefix}${chatId}`, JSON.stringify(updatedConversations));

                    //update conversation
                }}>send back</Button>
            </form>
        </div>
    )
}